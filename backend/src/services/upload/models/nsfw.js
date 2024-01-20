const mongoose = require('mongoose');

const NSFWSchema = new mongoose.Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    unsafe: {
        type: Boolean,
        default: false
    },
    items: Object
})

const NSFWModel = mongoose.model('NSFW', NSFWSchema);

module.exports = NSFWModel;
