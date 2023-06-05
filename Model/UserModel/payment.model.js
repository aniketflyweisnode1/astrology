const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    productOrderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CartProductOrder"
    },
    payment_Id: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    invoice: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    receipt: {
        type: String,
        required: true
    },
    amount_paid: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    transferType: {
        type: String,
        enum: ["deposit", "withdrawal", "Withdrawal", "Deposit", "GIVEN", "TAKEN"]
    },
    date: {
        type: Date
    },
    paymentMethod: {
        type: String,
        enum: ["upi", "DebitCard", "Debitcard", "debitcard", "creditcard", "CreditCard"]
    },
    product: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "Cancelled",
        enum: ["Cancelled", "Invoiced", "Ordered"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', schema);
