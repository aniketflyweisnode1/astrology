const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        addressType: {
            type: String,
            default: "Home",
        },
        billTo: {
            type: String,
            default: "",
        },
        mobile: {
            type: Number,
        },
        city: {
            type: String,
            default: "",
        },
        state: {
            type: String,
            default: "",
        },
        pincode: {
            type: Number,
        },
        houseNumber: {
            type: String,
            default: "",
        },
        completeAddress: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Address", schema);
