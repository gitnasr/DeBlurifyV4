const Safe = require("../../middlewares/Safe");
const CountryFromIp = require("../../middlewares/ipWrapper");
const crypto = require("crypto");
const {signToken} = require("../../middlewares/authentication");
const User = require("./model");
const ImageModel = require("../upload/models/image");
const {GetConfig} = require("../admin/admin");
const AnonymousLogin = Safe( async (req, res) => {

    const deviceUuid = crypto.randomBytes(32).toString("hex").toUpperCase();
    const country = await CountryFromIp(req.clientIp);

    const user = await User.create({
        ...req.body,
        deviceUuid,
        country
    })
    return res.json(user)
})
const TokenLogin = Safe( async (req, res) => {
    const {deviceId} = req.body;
    const user = await User.findOne({deviceUuid: deviceId}).where({isActive: true});
    if(!user) return res.status(404).json({message: 'User not found'});
    const token = signToken({deviceId});
    const config = await GetConfig();
    return res.json({token,config})
})

const getUser = Safe( async (req, res) => {
    const {deviceId} = req;
    const doc = await User.findOne({deviceUuid: deviceId}).where({isActive: true}).lean()
    const uploadsCount = await ImageModel.find({user: doc._id}).countDocuments();
    return res.json({...doc,uploads: uploadsCount})
})
module.exports = {
    AnonymousLogin,TokenLogin,getUser
}
