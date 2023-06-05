const Review = require("../../Model/UserModel/productReview.model");
const Product = require("../../Model/UserModel/product");
const productReviewRoute = require("../../Routes/UserRouter/productReview.route");

exports.createReview = async (req, res) => {
    try {
        if (!(req.body.rating && req.body.message)) {
            return res
                .status(400)
                .json({ message: "message and rating is required" });
        }
        const product = await Product.findOne({ _id: req.body.productId });
        if (!product)
            return res.status(404).send({ message: "product not found" });
        const review = new Review({
            userId: req.user._id,
            name: req.user.firstName + " " + req.user.lastName,
            productId: req.body.productId,
            rating: req.body.rating,
            message: req.body.message,
        });
        const updated = await review.save();
        const t = await Review.aggregate([
            { $match: { productId: updated.productId } },
            { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } }, // group by `null` to calculate the average rating across all reviews
        ]);
        console.log(t);

        // product.review.push(updated._id);
        product.averageRating = t[0].avgRating;
        product.averageRating = product.averageRating.toFixed(1);
        const updatedProduct = await product.save();
        console.log(updatedProduct);
        res.status(201).json({ message: "review submitted", data: updated });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const queryObj = {};
        if (req.query.productId) {
            queryObj.productId = req.query.productId;
        }
        const reviews = await Review.find(queryObj);
        if (reviews.length === 0) {
            return res.status(204).json({ message: "no reviews found" });
        }
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) throw new Error("Review not found");
        res.json({ review });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) throw new Error("Review not found");

        // Update fields that are present in the request body
        if (req.body.userId) review.userId = req.body.userId;
        if (req.body.name) review.name = req.body.name;
        if (req.body.productId) review.productId = req.body.productId;
        if (req.body.rating) review.rating = req.body.rating;
        if (req.body.message) review.message = req.body.message;

        await review.save();
        res.json({ review });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) throw new Error("Review not found");
        await review.remove();
        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
