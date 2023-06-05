const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        astroId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
            required: true,
        },
        time: {
            type: String,
        },
        // createdAt : new Date().toISOString(),
        name: {
            type: String,
        },
        problem: {
            type: String,
        },
        language: {
            type: [String],
        },
        rashi: {
            type: String,
        },
        astroName: {
            type: String,
        },
        orderType: {
            type: String,
            enum: ["call", "chat", "video"],
        },
        userToken: {
            type: String,
        },
        astroToken: {
            type: String,
        },
        orderStatus: {
            type: String,
            enum: ["pending", "accepted", "rejected", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
