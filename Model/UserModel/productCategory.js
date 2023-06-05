const mongoose = require("mongoose");
const productCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "ProductCategory",
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("productCategory", productCategorySchema);
