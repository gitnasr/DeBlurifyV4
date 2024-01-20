const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    adsIds:{
        type: [Object],
        default: [],
    },
    allowAds:{
        type: Boolean,
        default: true
    },
    noAdsDeviceIds:{
        type: [String],
        default: [],
        ref: 'User'
    },



},{
    timestamps: true
})

const Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;
