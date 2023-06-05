const router = require("express").Router();
const { isAuthenticated } = require("../../Controller/User/auth.controller");
const astroControllers = require("../../Controller/Astrologer/astrologerControllers");
const admin = require("../../Controller/Admin/adminCtrl");
const product = require("../../Controller/User/productControllers");
const terms = require("../../Controller/User/terms.controller");
const productOrder = require("../../Controller/Astrologer/astro-product-order");
const cart = require("../../Controller/User/cart.controller");
const upload = require("../../services/upload");
//cart apis
router.get("/cart/:id", cart.getItemInCartOfUser);
router.post("/cart", isAuthenticated, cart.addToCart);

//Blogs
router.get("/blogs/:id", admin.ViewDataBlogs);
router.get("/blogs", admin.GetBlogs);

//products
router.get("/products/:id", product.getProduct);
router.get("/products", product.getProducts);
router.get("/recommended-products/:id", product.getRecommendedProducts);
// product order
router.post("/product-order", productOrder.createCartProductOrder);
router.get("/product-order/:id", productOrder.getCartProductOrderById);
router.get("/product-order", productOrder.getCartProductOrders);
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
router.put("/signup/:id", astroControllers.signUpUser);
router.put("/signup2/:id", astroControllers.signup2);
router.post("/login", astroControllers.login);
router.post("/verify/:id", astroControllers.verifyOTP);
router.post("/loginwithmobile", astroControllers.loginWithMobile);
router.post("/verifymobileotp/:id", astroControllers.verifyMobileOtp);
router.get("/resend-otp/:id", astroControllers.resendOtp);
router.post("/forgotpassword", astroControllers.forgetPassword);
router.patch("/resetpassword/:id", astroControllers.resetPassword);
router.get("/view/:id", astroControllers.ViewDataProfiles);
router.get(
    "/search/:key",

    astroControllers.SearchAstroNameLangSkills
);
router.get("/blog", astroControllers.getAllBlogs);
router.delete(
    "/removed/:id",
    isAuthenticated,
    astroControllers.deleteAstroName
);
router.delete(
    "/remove-language",
    isAuthenticated,
    astroControllers.deleteLanguages
);
router.get("/all", astroControllers.GetAllAstro);
router.put("/update/:id", isAuthenticated, astroControllers.updateAstro);
router.get("/:id", astroControllers.getastroById);

//Terms
router.get("/products/:id", product.getProduct);
router.get("/products", product.getProducts);

module.exports = router;
