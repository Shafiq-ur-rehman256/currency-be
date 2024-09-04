
const {usersModel} = require('../models/index');
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const jwt = require('jsonwebtoken');
const {config} = require('../config/index');

const signup = async(req, res) =>{
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error("Please provide all required fields")
        }

        const isUserExist = await usersModel.findOne({username}).exec();

        if(isUserExist) throw new Error("User already exist!");

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const createUser = await usersModel.create({
            username: username,
            password: hashPassword,
        });

        createUser.save();

        return res.status(200).json({
            success: true,
            message: 'user created successfully'
        })

    } catch (error) {
        throw new Error(error.message);
    }
}

const authenticate = async(req,res)=>{
    try {
        
        const {username, password} = req.body;

        if(!username || !password) throw new Error("Please provide all required fields");

        const isUserExist = await usersModel.findOne({username}).exec();

        if(!isUserExist) throw new Error("User not exist!");

        const isMatch = await bcrypt.compare(password,isUserExist.password);

        if(!isMatch) throw new Error("Please provide valid password");

        const payload = {
            username: isUserExist.username,
            id: isUserExist._id,
        }

        const token = jwt.sign(payload, config.jwt_secret,{
            expiresIn: '2d'
        } );

        await usersModel.updateOne({ _id: isUserExist._id }, { $set: {
            auth_token: token
        } });

        return res.status(200).json({
            success: true,
            message: "User authenticate successfully!",
            data: {
                username: isUserExist.username,
                token
            }
        })


    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports =  {
    signup,
    authenticate
}