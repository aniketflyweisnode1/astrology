const mongoose = require("mongoose");

const astrochatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
    },
    time: {
        type: String,
    },
    timeBooked: {
        type: String,
    },
});

const astroChat = mongoose.model("astrochat", astrochatSchema);

module.exports = astroChat;
