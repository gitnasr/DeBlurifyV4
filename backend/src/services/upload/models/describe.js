const mongoose = require('mongoose');

const DescribeSchema = new mongoose.Schema({
    image: {
type:mongoose.Schema.Types.ObjectId,
ref: 'Image'
    },
    tags: {
type: Array,
    },
    text: String
}, {timestamps: true});

const DescribeModel = mongoose.model('Describe', DescribeSchema);

module.exports = DescribeModel;
