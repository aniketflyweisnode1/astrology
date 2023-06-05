const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            default: "",
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AppFeedback", schema);
