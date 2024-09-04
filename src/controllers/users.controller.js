const { signup, authenticate } = require("../services/users.service");


exports.signup = async (req, res) => {
    try {
        return await signup(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.authenticate = async (req, res) => {
    try {
        return await authenticate(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}