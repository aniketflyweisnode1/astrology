const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
