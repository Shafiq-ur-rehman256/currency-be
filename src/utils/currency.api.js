const { config } = require('../config');

const axios = require('axios');


const allCurrencies = async() =>{
    try {
        const headers = {
            apikey: config.currency_api_key
        }
        const response = await axios.get(`${config.currency_api_endpoint}/currencies`, {headers: headers});

        return response.data;

    } catch (error) {
        throw new Error(error.message)
    }
}

const CurrencyCovertor = async(base_currency, currencies) =>{
    try {
        const headers = {
            apikey: config.currency_api_key
        }
        const response = await axios.get(`${config.currency_api_endpoint}/latest?base_currency=${base_currency}&currencies=${currencies}`, {headers: headers});

        return response.data;

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports =  {
    allCurrencies,
    CurrencyCovertor
}