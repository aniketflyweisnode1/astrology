const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const birthSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
        },
        firstName: {
            type: String,
            default: "",
            required: false,
        },
        lastName: {
            type: String,
            default: "",
            required: false,
        },
        emailId: {
            type: String,
            default: "",
            required: false,
        },
        
    },
    { timestamps: true }
);
module.exports = mongoose.model("birthDetails", birthSchema);
