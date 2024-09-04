const mongoose = require('mongoose');

const schema = mongoose.Schema;

const conversionRecordsSchema = new schema({
    baseCurrency: {
        type: String,
        trim: true,
    },
    targetCurrency:{
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
    convertedAmount: {
        type: Number,
        trim: true,
    },
    date: {
        type: Date
    },
    user: [{ type: schema.Types.ObjectId, ref: 'users' }]
},{timestamps: true})

exports.ConversionRecordsModel = mongoose.model('conversionRecords', conversionRecordsSchema);