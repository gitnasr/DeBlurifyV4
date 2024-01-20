const Safe = require("../../middlewares/Safe");
const Replicate = require("replicate");
const {findByImageId} = require("../upload/process");
const {findByRemoteId, createNewEnhance, findResultByImageId} = require("./CodeFormer");
const VARS = require("../../config/env");
const {toGoogleStorage} = require("../upload/upload");
const {makeAThumbnail, AddWatermark} = require("../utils/Editor.Service");

const OptimizeImage = Safe(async (req, res) => {
    const {image} = req.body;
    const {user} = req;
    const options = {
        upscale: 1, codeformer_fidelity: 0.4, face_upsample: true, background_enhance: true,

    }
    const doc = await findByImageId(image, {user: user._id});
    if (!doc) return res.sendStatus(404)
    const replicateKey = VARS.REPLICATA.CODEFORMER_API_KEY
    const replicate = new Replicate({
        auth: replicateKey,
    });
    const prediction = await replicate.predictions.create({
        version: "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56", input: {
            image: doc.SecureURL, ...options
        }, webhook: "https://deblurify-15a37.oa.r.appspot.com/enhance/webhook",
    });
    const EnhancePayload = {
        image: doc._id, user: user._id, options, id: prediction.id, status: "PROCESSING",

    }
    const enhance = await createNewEnhance(EnhancePayload);
    return res.json(enhance);
})
const Webhook = Safe(async (req, res) => {
    const {id, status} = req.body;
    if (status === "succeeded") {
        const doc = await findByRemoteId(id);
        const inGC = await toGoogleStorage(req.body.output);
        const thumbnail = await toGoogleStorage(await makeAThumbnail(inGC),true);
        const watermarked = await toGoogleStorage(await AddWatermark(inGC),true);
        await doc.updateOne({status: "SUCCESS", original: inGC, thumbnail,watermarked})


    }
    return res.sendStatus(200)
})

const GetEnhance = Safe(async (req, res) => {
    const {user} = req;
    const {id} = req.query;
    const doc = await findResultByImageId(id,{user:user._id});
    if (!doc) return res.sendStatus(404);
    return res.json(doc);
})
const RateEnhance = Safe(async (req, res) => {
    const {user} = req;
    const {id, rate} = req.body;
    const doc = await findResultByImageId(id,{user:user._id});
    if (!doc) {
        return res.sendStatus(404)
    }
    await doc.updateOne({Rate: rate});

    return res.sendStatus(200);
})
module.exports = {
    OptimizeImage, Webhook, GetEnhance,RateEnhance
}
