const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    SecureURL: {
        type: String,
        required: true
    },
    PublicID: {
        type: String,
        required: true
    },
    NSFW: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'NSFW'
    },
    Describe: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Describe'
    },
    faceCount:{
        type: Number,
        default: 0
    },
    persons:{
        type: Object,
        default: null
    },
    isGroup:{
        type: Boolean,
        default: false
    },
    isHasMale:{
        type: Boolean,
        default: false
    } ,
    isHasFemale:{
        type: Boolean,
        default: false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    hash:{
        type: String,
        required: true
    },
    format:{
        type: String,
        required: true
    },
    original_filename:{
        type: String,
        required: true
    },
    info:{
        type: Object,
    },
    exif:{
        type: Object,
    },
    assetId:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default:"ACTIVE"
    },
    DetectionRate:{
        type: Number,
        default: 0
    }
},{
    timestamps: true

})


const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;
