const mongoose = require("mongoose");

const AstroStatus = mongoose.Schema(
    {
        astroId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        channelName: {
            type: String,
        },
        astroName: {
            type: String,
        },
        time: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: true,
        },
        token: {
            type: String,
        },
    },
    { timestamps: true }
);

const Astrostatus = mongoose.model("astroStatus", AstroStatus);

module.exports = Astrostatus;
