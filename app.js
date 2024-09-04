const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { conectDatabase } = require('./src/database');
// require('dotenv').config();

const app = express();

conectDatabase();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    return res.send({
        success: true,
        message: 'Express Currency Convertor app'
    });
})

app.use("/api/v1", require("./src/routes/index"));

app.use('**', (req, res) => {
    return res.send({
        success: false,
        message: '404 not found'
    })
})

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})
