const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    payment_Id: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    productOrderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CartProductOrder",
    },
    invoice: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    receipt: {
        type: String,
        required: true,
    },
    amount_paid: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["given", "Given", "taken", "Taken", "GIVEN", "TAKEN"],
    },
    date: {
        type: Date,
    },
    paymentMethod: {
        type: String,
        enum: [
            "upi",
            "DebitCard",
            "Debitcard",
            "debitcard",
            "creditcard",
            "CreditCard",
        ],
    },
    product: {
        type: String,
    },
    orderStatus: {
        type: String,
        default: "Cancelled",
        enum: ["Cancelled", "Invoiced", "Ordered"],
    },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
