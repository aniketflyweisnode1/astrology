const express = require("express");
const {
  createUser,
  loginUser,
  updatedUser,
  getallUser,
  getaUser,
  deleteaUser,
  forgotPasswordToken,
  astroProfileVerify,
  generateOTP,
  resendOTP,
  registerWithMobile,
  verifyOTP
} = require("../../Controller/Astrologer/astroCtrl.js");

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/:id", updatedUser);
router.get("/getall", getallUser);
router.get("/:id", getaUser);
router.delete("/:id", deleteaUser);
router.post("/forgot", forgotPasswordToken);
router.put("/verify/:id", astroProfileVerify);
router.post("/otp", generateOTP)
router.post("/resend-otp/:id", resendOTP);
router.post("/register-mobile", registerWithMobile);
router.post("/verify-otp", verifyOTP);




module.exports = router;
