const express = require('express');
const { authmiddleware } = require('../middleware/auth.middleware');
const { getAllCurrencies, convertAmount, conversions } = require('../controllers/conversion.controller');
const app = express();

const router = express.Router();




router.get('/currencies', authmiddleware,  getAllCurrencies);

router.get('/', authmiddleware,  conversions)

router.post('/convertAmount',authmiddleware, convertAmount);





exports.coversionsRoute = app.use('/coversions', router)