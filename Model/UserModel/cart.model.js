const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    userId: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    astrologer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "astrologer",
    },
});

module.exports = mongoose.model("Cart", cartSchema);

// const mongoose = require("mongoose");

// const cartProductsSchema = new mongoose.Schema({
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "product"
//     },
//     quantity: {
//         type: Number,
//         default: 1
//     }
// }, { _id: false })

// const CartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     products: {
//         type: [cartProductsSchema]
//     },
//     coupon: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Coupon",
//         default: null,
//     }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model("Cart", CartSchema)
