const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userId",
        },
        astroId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
        },
        product: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "product",
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            default: null,
        },
        totalPrice: {
            type: Number,
        },
        orderStatus: {
            type: String,
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CartProductOrder", schema);
