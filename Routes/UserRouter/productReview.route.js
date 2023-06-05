const productReviews = require("../../Controller/User/productReview.controller");
const { isAuthenticated } = require("../../Controller/User/auth.controller");
module.exports = (app) => {

    app.put("/api/v1/admin/productReviews/:id", [isAuthenticated], productReviews.updateReview);

    app.get("/api/v1/admin/productReviews/:id", productReviews.getReviewById);
    app.get("/api/v1/admin/productReviews", productReviews.getAllReviews);
    app.delete("/api/v1/admin/productReviews/:id", [isAuthenticated], productReviews.deleteReview);

    //astrologer
    app.get("/api/v1/astrologer/productReviews/:id", productReviews.getReviewById);
    app.get("/api/v1/astrologer/productReviews", productReviews.getReviewById);

    //user
    app.get("/api/v1/user/productReviews/:id", productReviews.getReviewById);
    app.get("/api/v1/user/productReviews", productReviews.getAllReviews);
    app.post("/api/v1/user/productReviews", [isAuthenticated], productReviews.createReview);
    app.put("/api/v1/user/productReviews/:id", [isAuthenticated], productReviews.updateReview);
};
