const mongoose = require('mongoose');

const schema = mongoose.Schema;

const usersSchema = new schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        trim: true,
        minlength: 6
    }
},{timeseries: true})

exports.userModel = mongoose.model('users', userSchema);