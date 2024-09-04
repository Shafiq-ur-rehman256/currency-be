require('dotenv').config();
// console.log(process.env.google_callback_url);
exports.config = {
    mongo_uri: process.env.MONGODB_URI,
    jwt_secret: process.env.JWT_SECRETE,
    currency_api_endpoint: process.env.CURRENCY_API_ENDPOINT,
    currency_api_key: process.env.CURRENCY_API_KEY
}