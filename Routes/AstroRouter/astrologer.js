const router = require("express").Router();
const { isAuthenticated } = require("../../Controller/User/auth.controller");
const astroControllers = require("../../Controller/Astrologer/astrologerControllers");
const admin = require("../../Controller/Admin/adminCtrl");
const product = require("../../Controller/User/productControllers");
const terms = require("../../Controller/User/terms.controller");
const productOrder = require("../../Controller/Astrologer/astro-product-order");
const cart = require("../../Controller/User/cart.controller");
const upload = require("../../services/upload");

const verfiyToken = require("../../Middleware/auth");

//cart apis
router.get("/cart/:id", verfiyToken, cart.getItemInCartOfUser);
router.post("/cart", isAuthenticated, cart.addToCart);

//Blogs
router.get("/blogs/:id", admin.ViewDataBlogs);
router.get("/blogs", admin.GetBlogs);

//products
router.get("/products/:id", product.getProduct);
router.get("/products", verfiyToken, product.getProducts);
router.get("/recommended-products/:id", product.getRecommendedProducts);
// product order
router.post("/product-order", productOrder.createCartProductOrder);
router.get("/product-order/:id", productOrder.getCartProductOrderById);
router.get("/product-order", verfiyToken, productOrder.getCartProductOrders);
router.put("/product-order/:id", productOrder.updateCartProductOrder);
router.delete("/product-order/:id", productOrder.deleteCartProductOrder);

//profile
router.get("/profile/:id", astroControllers.getAstrolgerById);
router.put(
    "/profile-image/:id",
    upload.single("image"),
    astroControllers.updateProfile1
);
router.put(
    "/profile/:id",

    astroControllers.updateAstrologer
);

//astrologer
router.post("/register", astroControllers.register);
router.put("/signup/:id", verfiyToken, astroControllers.signUpUser);
router.put("/signup2/:id", verfiyToken, astroControllers.signup2);
router.post("/login", astroControllers.login);
router.post("/verify/:id", verfiyToken, astroControllers.verifyOTP);
router.post("/loginwithmobile", astroControllers.loginWithMobile);
router.post("/verifymobileotp/:id", verfiyToken, astroControllers.verifyMobileOtp);
router.get("/resend-otp/:id", verfiyToken, astroControllers.resendOtp);
router.post("/forgotpassword", astroControllers.forgetPassword);
router.patch("/resetpassword/:id", verfiyToken, astroControllers.resetPassword);
router.get("/view/:id", verfiyToken, astroControllers.ViewDataProfiles);
router.get(
    "/search/:key",
    verfiyToken,
    astroControllers.SearchAstroNameLangSkills
);
router.get("/blog", astroControllers.getAllBlogs);
router.delete(
    "/removed/:id",
    verfiyToken,
    isAuthenticated,
    astroControllers.deleteAstroName
);
router.delete(
    "/remove-language",
    verfiyToken,
    isAuthenticated,
    astroControllers.deleteLanguages
);
router.get("/all", verfiyToken, astroControllers.GetAllAstro);
router.put("/update/:id", verfiyToken, isAuthenticated, astroControllers.updateAstro);
router.get("/:id", astroControllers.getastroById);

// Terms
router.get("/products/:id", verfiyToken, product.getProduct);
router.get("/products", verfiyToken, product.getProducts);

module.exports = router;
