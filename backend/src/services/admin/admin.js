const Config = require("./config");
const GetConfig =  () => {
    return Config.findOne();
}

const ConfigUpdate =  (payload) => {
    return Config.findOneAndUpdate({}, payload, {new: true,upsert:true});
}

module.exports = {
    GetConfig,ConfigUpdate
}
