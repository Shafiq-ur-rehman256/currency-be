const express = require('express');
const {signup, authenticate} = require('../controllers/users.controller');
const app = express();

const router = express.Router();


router.post('/register',signup);

router.put('/authenticate', authenticate);


exports.userRoute = app.use('/users', router)