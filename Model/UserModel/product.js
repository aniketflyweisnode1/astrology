const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: [Object],
            default: [],
        },
        price: {
            type: Number,
        },
        discountedPrice: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "",
        },
        size: {
            type: [String],
            default: [],
        },
        color: {
            type: String,
            default: "",
        },
        productCategory: {
            type: String,
            default: "",
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        discountPercent: {
            type: String,
            default: "",
        },
        review: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "ProductReview",
            default: [],
        },
        highlights: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("product", productSchema);
