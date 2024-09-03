require('dotenv').config();
// console.log(process.env.google_callback_url);
exports.config = {
    mongo_uri: process.env.MONGODB_URI,
}