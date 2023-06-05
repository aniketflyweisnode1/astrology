const mongoose = require('mongoose');


const discountSchema = mongoose.Schema({
    code: {
        type: String
    },
    activeDate: {
        type: String
    },
    expireDate: {
        type: String
    },
    percent: {
        type: Number
    }
})

module.exports = mongoose.model('discount', discountSchema)
