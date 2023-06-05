const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    rating: {
        type: Number,
    },
    message: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('ProductReview', schema);
