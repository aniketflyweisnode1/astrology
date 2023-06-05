const mongoose = require("mongoose");

const astrologerFeeSchema = new mongoose.Schema(
    {
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "astrologer",
        },
        chat: {
            type: Number,
            // required: true,
        },
        callFeePerMinute: {
            type: Number,
            // required: true,
        },
        report: {
            type: Number,
            // required: true,
        },
        astroMall: {
            type: Number,
        },
        liveEventOrVideoCall: {
            type: Number,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AstrologerFees", astrologerFeeSchema);
