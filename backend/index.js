require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const { default: mongoose } = require('mongoose');

const requestIp = require('request-ip');
const useragent = require('express-useragent');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const actuator = require('express-actuator');
const compression = require('compression');
const VARS = require('./src/config/env');
const Morgan = require('./src/config/morgan.config');
const ApiError = require('./src/config/ApiError');
const httpStatus = require('http-status');
const Routes = require('./src/routes');
const ErrorMiddleware = require("./src/middlewares/error");


const app = express();
app.use(express.json())


app.use(helmet());
app.use(requestIp.mw());
app.use(express.urlencoded({extended: true}));
app.use(useragent.express());
app.use(xss());
app.use(mongoSanitize());
app.use(actuator());
app.use(compression())

Routes(app);

if (VARS.ENV !== 'test') {
    app.use(Morgan.successHandler);
    app.use(Morgan.errorHandler);
}
const initializeConfig = async () => {
    try {
        await mongoose.connect(VARS.MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }
};
async function graceful() {
    process.exit(0);
}

process.on('SIGTERM', graceful);

process.on('SIGINT', graceful);
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});


// You can also add an unhandled rejection handler to handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    // Optionally, handle the rejection here, or simply log it.
});
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(ErrorMiddleware.errorConverter);
app.use(ErrorMiddleware.errorHandler);

app.listen(VARS.PORT, async () => {
    await initializeConfig();
    console.log(JSON.stringify(process.env));
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
