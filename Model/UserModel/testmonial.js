const mongoose = require("mongoose");

const testimonial = new mongoose.Schema(
    {
        userId: {
            type: String,
        },

        image: {
            type: String,
        },
        name: {
            type: String,
        },
        desc: {
            type: String,
        },
    },
    { timestamps: true }
);

const testiMonial = mongoose.model("testimonial", testimonial);

module.exports = testiMonial;
