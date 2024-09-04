const jwt = require('jsonwebtoken');
const { ConversionRecordsModel, usersModel } = require('../models');
const {allCurrencies, CurrencyCovertor} = require('../utils/currency.api');
const { config } = require('../config');

const getAllCurrencies = async(req, res) =>{
    try {

        const currencies = await allCurrencies();
        let currencyList = Object.keys(currencies.data)
        currencyList = currencyList.map((ele, ind)=> currencies.data[ele])
        return res.status(200).json({
            success: true,
            message: "Currency List",
            data: currencyList
        })
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const convertor = async(req, res) =>{

    try {

        const {baseCurrency, amount, targetCurrency} = req.body;

        if(!baseCurrency || !amount || !targetCurrency) throw new Error("Please provide all required fields!");

        const response = await CurrencyCovertor(baseCurrency, targetCurrency);
        const rate = response.data[targetCurrency];
        // conversion formula
        const convertedAmount = rate * amount;

        // extract user by token
        const decoded = jwt.verify(req.headers.authorization, config.jwt_secret);
        const user = await usersModel.findOne({_id:decoded.id}).exec();
        
        // save record
        const createRecord = await ConversionRecordsModel.create({
            baseCurrency: baseCurrency,
            targetCurrency: targetCurrency,
            convertedAmount: convertedAmount,
            amount: amount,
            date: new Date(),
            user: user
        });

        createRecord.save();


        return res.status(200).json({
            success: true,
            message: "Converted Amount",
            data: {
                baseCurrency,
                targetCurrency,
                amount: convertedAmount
            }
        })
        
    } catch (error) {
        throw new Error(error.message);
    }

}

const getAllConversions = async(req, res) => {
    try {

        const token = req.headers.authorization;

        // extract user by token
        const decoded = jwt.verify(req.headers.authorization, config.jwt_secret);
        const user = await usersModel.findOne({_id:decoded.id}).exec();

        const allConversions = await ConversionRecordsModel.find({
            user: user
        }).sort({ createdAt: -1 }).exec();

        return res.status(200).json({
            success: true,
            message: "Conversion List",
            data: allConversions
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports =  {
    getAllCurrencies,
    convertor,
    getAllConversions
}