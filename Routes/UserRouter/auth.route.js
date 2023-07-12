
const router = require("express").Router();
const authController = require("../../Controller/User/auth.controller");
const { isAuthenticated } = require("../../Controller/User/auth.controller");
const verfiyToken = require("../../Middleware/auth");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });
router.post("/register", authController.register);
router.post("/resend-otp/:id", authController.resendOtp);
router.put("/signUp/:id", authController.signUpUser);
router.put("/signup2/:id", authController.signup2);
router.post("/login", authController.login);
router.post("/verify/:id", verfiyToken, authController.verifyOTP);
router.post("/loginwithmobile", authController.loginWithMobile);
router.post("/verifymobileotp/:id", verfiyToken, authController.verifyMobileOtp);
router.post("/forgotpassword", verfiyToken, authController.forgetPassword);
router.patch("/resetpassword/:id", verfiyToken, authController.resetPassword);

// router.post("/sendOTP", authController.sendOTP);
// router.post("/verify", verfiyToken, authController.verifyOTP);
router.post("/sign/verify", authController.verifyOTPSignedIn);
router.post("/login", verfiyToken, authController.login);

router.put(
    "/update-profile/:id",
    isAuthenticated,
    verfiyToken,
    authController.updateUserProfile
);
router.get(
    "/view-user-profiles",
    isAuthenticated,
    verfiyToken,
    authController.GetUserProfiles
);

// router.post(
//   "/user-blog",
//   upload.single("myField"),
//   isAuthenticated,
//   authController.postuserBlogs
// );
// router.patch(
//   "/edit-user-blog/:id",
//   upload.single("myField"),
//   isAuthenticated,
//   authController.UpdateBlogs
// );

module.exports = router;
