const mongoose = require("mongoose");

const astrologerLiveScheduleSchema = new mongoose.Schema(
    {
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "astrologer",
        },
        startTime: {
            type: String,
            default: "",
            required: true,
        },
        endTime: {
            type: String,
            default: "",
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        availableDays: {
            type: [String],
            required: true,
        },
        isBooked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "AstrologerLiveSchedule",
    astrologerLiveScheduleSchema
);
