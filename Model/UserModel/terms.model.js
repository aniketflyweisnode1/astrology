const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        terms: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("terms", schema);
