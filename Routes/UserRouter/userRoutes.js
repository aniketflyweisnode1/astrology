const express = require("express");
const router = express.Router();
const admin = require("../Admin/adminRoute");
const { isAuthenticated } = require("../../Controller/User/auth.controller");
const user = require("../../Controller/User/userController");
const walletController = require("../../Controller/User/walletController");
const followController = require("../../Controller/User/followController");
const referController = require("../../Controller/User/referController");
const notificationControllers = require("../../Controller/User/NotificationController");
const testimonalControllers = require("../../Controller/User/testimonial");
const payment = require("../../Controller/User/payments");
const product = require("../../Controller/User/productControllers");
const cart = require("../../Controller/User/cart.controller");
const address = require("../../Controller/User/address.controller");
const productOrder = require("../../Controller/User/productOrder");
const productReview = require("../../Controller/User/productReview.controller");

const verfiyToken = require("../../Middleware/auth");

router.get("/search-language", verfiyToken, user.SearchUserNameLangSkills);
router.get("/search-any-user-name", verfiyToken, user.SearchUserName);
router.get("/search-by-languages", verfiyToken, user.SearchAnyLanguagesName);
router.delete("/removed/:user_Name", verfiyToken, user.deleteUserName);

router.delete("/removed-language/:language", verfiyToken, user.deleteLanguages);

// Blogs
// router.put("/blogs/:id", admin.updateBlogById);
// router.get("/blogs/:id", admin.getBlogById);
// router.get("/blogs", admin.getBlogs);

// Products
router.get("/products/:id", verfiyToken, product.getProduct);
router.get("/products", verfiyToken, product.getProducts);

// Cart
router.get("/cart/:id", verfiyToken, cart.getItemInCartOfUser);
router.post("/cart", verfiyToken, cart.addToCart);

// Address
router.post("/address", verfiyToken, address.create);
router.get("/address/:id", verfiyToken, address.getByUserId);

// Product Order
router.post("/productOrder", verfiyToken, productOrder.createCartProductOrder);
router.get("/productOrder", verfiyToken, productOrder.getCartProductOrders);

// Product Review
router.post("/productReview", verfiyToken, productReview.createReview);
router.get("/productReview", productReview.getAllReviews);

// Users
router.get("/", user.getAllUsers);
router.put("/feedback/:id", verfiyToken, user.updateFeedback);
router.delete("/feedback/:id", verfiyToken, user.deleteFeedback);
router.post("/feedback", verfiyToken, user.UserFeedback);
router.get("/feedback/:id", verfiyToken, user.getFeedbackById);
router.get("/feedback", verfiyToken, user.GetAllFeedBack);

// Refer
router.get("/refer", verfiyToken, referController.getReferral);
router.put("/refer", verfiyToken, referController.useReferCode);

// Payment
router.post("/payment", verfiyToken, payment.CreatePaymentOrder);
router.get("/payment/:id", verfiyToken, payment.GetPaymentsById);

// Testimonial
router.get("/live", verfiyToken, user.GetAstroliveChanges);
router.get("/upcoming", verfiyToken, user.GetAstroUpcoming);

// Terms
router.get("/products/:id", verfiyToken, product.getProduct);
router.get("/products", verfiyToken, product.getProducts);

module.exports = router;
