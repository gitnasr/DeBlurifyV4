const EnhanceModel = require('./model');

const findByRemoteId = async (remoteId) => {
    return EnhanceModel.findOne({id: remoteId});
}
const createNewEnhance = (payload) => {
    return EnhanceModel.create(payload);
}
const findResultByImageId = async (imageId,options={}) => {
    return EnhanceModel.findOne({image: imageId}).where(options).sort({createdAt: -1});
}
module.exports = {
    findByRemoteId,createNewEnhance,findResultByImageId
}
