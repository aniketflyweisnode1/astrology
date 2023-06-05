const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Privacy", schema);
