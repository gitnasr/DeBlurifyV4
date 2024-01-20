
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ApiError = require('../config/ApiError');
const VARS = require('../config/env');
const logger = require('../config/logger');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let {statusCode, message} = err;
    if (VARS.ENV === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(VARS.ENV === 'development' && {stack: err.stack}),
    };

    if (VARS.ENV === 'development') {
        logger.error(err);
    }

    // Save error in database


    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
}
