const cloudinary = require("cloudinary").v2;
const VARS = require("../../config/env");
const Safe = require("../../middlewares/Safe");
const {FacePlusPlus, DescribeImage, NSFWDetector, HashImage, findByHash, createImage, updateImage, findByUserId,
    findByImageId
} = require("./process");
const mongoose = require("mongoose");
const ImageModel = require("./models/image");
const DescribeModel = require("./models/describe");
cloudinary.config({
    cloud_name: VARS.CLOUDINARY.CLOUD_NAME,
    api_key: VARS.CLOUDINARY.API_KEY,
    api_secret: VARS.CLOUDINARY.API_SECRET,
});

const NewImage = Safe(async (req, res) => {
        const { file } = req;
        const { user } = req;
        const ImageHash = await HashImage(req.file.buffer)
        const doc = await findByHash(ImageHash,{user:user._id})
        if (doc) {
            const result = doc.toObject()
            if (result.status !=="ACTIVE"){
                await updateImage(result._id,{status:"ACTIVE",DetectionRate:0})
                return res.json(result)
            }else{
                result.existed=true
            }

            console.log("Image existed",result)

            return res.json(result)
        }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "images",
            use_filename: true,
            exif: true,
            detection: 'captioning',
            overwrite: true,
        })
    const ai = await FacePlusPlus(result.secure_url)
    const ImagePayload = {
        SecureURL: result.secure_url,
        PublicID: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
        hash: ImageHash,
        format: result.format,
        original_filename: req.file.originalname,
        info: result.info,
        exif: result.exif,
        assetId: result.asset_id,
        NSFW: null,
        Describe: null,
        user: req.user._id,
        faceCount: ai.faceCount,
        persons: ai.result,
        isGroup: ai.faceCount > 1,
        isHasMale:ai.isHasMale,
        isHasFemale:ai.isHasFemale,
    }


    const Describe = await DescribeImage(req.file.buffer)
    const DescribePayload={
            text: Describe.q,
            tags: Describe.tags,
    }
    const nsfw = await NSFWDetector(result.secure_url)
    const NSFWPayload = {
        unsafe: nsfw.unsafe,
        items: nsfw.objects
    }
   const image = await createImage(ImagePayload,DescribePayload,NSFWPayload)
        return res.json(image)
    }
)
const GetImages = Safe(async (req, res) => {
        const docs = await findByUserId(req.user._id,{status:"ACTIVE"})
        return res.json(docs)
})
const DeleteImage = Safe(async (req, res) => {
        const {id} = req.params
        const image = await findByImageId(id)
        if (!image) return res.status(404).json({message: "Image not found"})
        await image.updateOne({status:"DELETED"})
        return res.json({message: "Deleted"})
})
const RateImage = Safe(async (req, res) => {
    const {rate,id} = req.body
    const image = await findByImageId(id)
    if (!image) return res.status(404).json({message: "Image not found"})
    await image.updateOne({DetectionRate:rate})
    return res.json({message: "Rated"})
})
module.exports = {
    NewImage,GetImages,DeleteImage,RateImage
}
