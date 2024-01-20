const mongoose = require('mongoose');

const errorReportsSchema = new mongoose.Schema({
    error: String,
    timestamp: Number,
    service: String,
    route: String,
    method: String,
    body: Object,
    params: Object,
    query: Object,
    headers: Object,
    request: Object,
});

const ErrorReportsModel = mongoose.model('ErrorReports', errorReportsSchema);

module.exports = ErrorReportsModel;
