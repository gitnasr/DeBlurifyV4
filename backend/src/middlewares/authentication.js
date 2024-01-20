const jwt = require('jsonwebtoken');
const VARS = require('../config/env');
const ApiError = require('../config/ApiError');
const User = require("../services/users/model");
const signToken = (payload) => {
    return jwt.sign(payload, VARS.JWT, { expiresIn: '5m' });
}

const verifyToken = async (req, res, next) => {
    try{
        const header = req.headers['authorization'];

        const token = header && header.split(' ')[1];
        if (!token)  next(new ApiError(401, 'Invalid Token'))

        const payload = jwt.verify(token, VARS.JWT);
        const {deviceId} = payload;
        const user = await User.findOne({deviceUuid: deviceId}).where({isActive: true});
        if(!user) return res.status(404).json({message: 'User not found'});
        req.user = user;
        req.deviceId = deviceId;

        next();
    }catch (e) {
        next(new ApiError(401, 'Unauthorized'))
    }

}

module.exports = {
    signToken,
    verifyToken
}
