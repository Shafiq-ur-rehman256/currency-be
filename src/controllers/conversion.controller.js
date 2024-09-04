const { getAllCurrencies, convertor, getAllConversions } = require("../services/conversion.service");

exports.getAllCurrencies = async (req, res) => {
    try {
        return await getAllCurrencies(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.convertAmount = async (req, res) => {
    try {
        return await convertor(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.conversions = async (req, res) => {
    try {
        return await getAllConversions(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}