const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    apiKey: String,
    timestamp: Number,
});

const RequestModel = mongoose.model('Request', requestSchema);

module.exports = RequestModel;
