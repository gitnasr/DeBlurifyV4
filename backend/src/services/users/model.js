const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    brand: {
        type: String,
    },
    modelName: {
        type: String,
    },
    osName: {
        type: String,
    },
    osVersion: {
        type: String,
        required: true
    },
    platformApiLevel: {
        type: String,
    },
    platformName: {
        type: String,
    },
    platformVersion: {
        type: String,
    },
    deviceType: {
        type: String,
    },
    isDevice: {
        type: Boolean,
    },
    productName: {
        type: String,
    },
    deviceUuid: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        default: null
    },
    country:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },



},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
