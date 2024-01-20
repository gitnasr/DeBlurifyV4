const mongoose = require('mongoose');

const EnhanceSchema = new mongoose.Schema({
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Rate:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default:"PENDING"
    },
    options:{
        type: Object,
        required: true
    },
    id:String,
    thumbnail:String,
    original:String,
    watermarked:String,

},{
    timestamps: true
})

const EnhanceModel = mongoose.model('Enhance', EnhanceSchema);

module.exports = EnhanceModel;
