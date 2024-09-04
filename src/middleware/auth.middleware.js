const jwt = require('jsonwebtoken');
const {usersModel} = require('../models/index');
const { config } = require('../config');


exports.authmiddleware = async(req,res, next) =>{

    const { authorization } = req.headers;

    if(!authorization){
        return res.send({
            success: true,
            message: 'Session expired, Retry to login!'
        })
    }

    try {
        const decoded = jwt.verify(authorization, config.jwt_secret);
        const isValidUser = await usersModel.findOne({_id:decoded.id, auth_token: authorization}).exec();

        if(!isValidUser){
            return res.send({
                success: true,
                message: 'Session expired, Retry to login!'
            })
        }else{
            next();
        }

    } catch (error) {
        return res.send({
            success: true,
            message: `internal server error: ${error.message}`
        })
    }
}