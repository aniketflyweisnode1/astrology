// const Astrologer = require("../../Model/AstroModel/astroModel");
// const asyncHandler = require("express-async-handler");
// const sendEmail = require("./emailCtrl");
// // const crypto = require("crypto");
// const twilio = require("twilio");
// const { generateJwtToken, generateRefreshToken } = require("../../Config/Token");

// const bcrypt = require('bcryptjs');

// const registerWithMobile = async (req, res) => {
//   // Check if the user already exists
//   const user = await Astrologer.findOne({ mobileNumber: req.body.mobileNumber });

//   // If the user already exists, return an error
//   if (user) {
//     res.status(400).send("User already exists");
//     return;
//   }

//   // Generate a new OTP
//   const otp = otp.generate(6);

//   // Save the user to the database
//   const newUser = await Astrologer.create({
//     name: req.body.name,
//     mobileNumber: req.body.mobileNumber,
//     otp: otp,
//     otpVerified: false,
//   });

//   // Send the OTP to the user's mobile number
//   // TODO: Implement this

//   // Return a success response
//   res.status(200).send(newUser);
// };

// const verifyOTP = asyncHandler ("/verify-otp", async (req, res) => {
//   // Check if the OTP is valid
//   const user = await Astrologer.findOne({ mobileNumber: req.body.mobileNumber });

//   // If the OTP is not valid, return an error
//   if (!user || user.otp !== req.body.otp) {
//     res.status(400).send("Invalid OTP");
//     return;
//   }

//   // Mark the OTP as verified
//   await user.update({ otpVerified: true });

//   // Return a success response
//   res.status(200).send("OTP verified");
// });

// ///======================================================> CREATE USER

// const createUser = asyncHandler(async (req, res) => {
//   const { email, password, confirmPassword } = req.body;
//   if (password !== confirmPassword) {
//     return res.status(403).send({ message: "Passwords do not match" });
//   }
//   try {
//     const findUser = await Astrologer.findOne({ email });

//     if (!findUser) {
//       const newUser = await Astrologer.create(req.body);
//       res.json(newUser);
//     } else {
//       console.log("User already exists");
//       res.status(400).json({ error: "User already exists" });
//     }
//   } catch (error) {
//     console.log("Something went wrong in Create User:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// ///======================================================> LOGIN USER

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const findUser = await Astrologer.findOne({ email });

//   if (findUser && (await findUser.isPasswordValid(password))) {
//     const jwtToken = generateJwtToken(findUser._id);
//     const refreshToken = generateRefreshToken(findUser._id);

//     res
//       .cookie("token", jwtToken, { httpOnly: true, maxAge: 1000000 })
//       .cookie("refreshtoken", refreshToken, { httpOnly: true, maxAge: 1000000 })
//       .json({
//         msg: "Login Successfully",
//         token: jwtToken,
//         refreshToken: refreshToken,
//         user: findUser,
//       });
//   } else {
//     res.status(401).json({ error: "Invalid Credentials" });
//   }
// });

// ///======================================================> UPDATE USER

// const updatedUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedUser = await Astrologer.findByIdAndUpdate(
//       id,
//       {
//         firstname: req?.body?.firstname,
//         lastname: req?.body?.lastname,
//         email: req?.body?.email,
//         mobile: req?.body?.mobile,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// ///======================================================> GET SINGLE USER

// const getaUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const getaUser = await Astrologer.findById(_id);
//     res.json({
//       getaUser,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// ///======================================================>  Get all users

// const getallUser = asyncHandler(async (req, res) => {
//   try {
//     const getUsers = await Astrologer.find();
//     res.json(getUsers);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// ///======================================================>  DELETE USER

// const deleteaUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteaUser = await Astrologer.findByIdAndDelete(id);
//     res.json({
//       deleteaUser,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// ///======================================================>  RESET Password USER

// const resetPassword = asyncHandler(async (req, res) => {
//   const { password } = req.body;
//   const { token } = req.params;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await Astrologer.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   if (!user) throw new Error(" Token Expired, Please try again later");
//   user.password = password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.json(user);
// });

// ///======================================================>  Forget Password USER

// const forgotPasswordToken = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await Astrologer.findOne({ email });
//   if (!user) throw new Error("User not found with this email");
//   try {
//     const token = await user.createPasswordResetToken();
//     await user.save();
//     const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8080/astro/forget/${token}'>Click Here</>`;
//     const data = {
//       to: email,
//       text: "Hey User",
//       subject: "Forgot Password Link",
//       html: resetURL,
//     };
//     sendEmail(data);
//     res.json(token);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// ///======================================================>  LOGOUT USER

// ///======================================================>  ASTRO PROFILE
// const astroProfileVerify = asyncHandler(async (req, res) => {
//   const astrologerId = req.params.id; // Assuming 'id' is the parameter for astrologerId
//   // const submittedOTP = req.body.otp; // Assuming 'otp' is the field for submitted OTP
//   // const resendOTP = req.body.resendOTP;

//   try {
//     const astrologer = await Astrologer.findByIdAndUpdate(astrologerId, req.body, {
//       new: true,
//     });
//     if (!astrologer) {
//       throw new Error("User not found with this id");
//     }
//     // Check if the submitted OTP matches the generated OTP
//     if (submittedOTP !== astrologer.otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     // Generate a new OTP if resendOTP flag is true
//     if (resendOTP) {
//       astrologer.otp = generateOTP();
//       // sendOTP(astrologer.phoneNumber, astrologer.otp);
//     }

//     const updatedAstrologer = await astrologer.save();
//     res.json(updatedAstrologer);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// //================================================> GENRATE OTP

// const generateOTP = asyncHandler(async (req, res) => {
//   const digits = "09090097791";
//   let otp = "";

//   for (let i = 0; i < 4; i++) {
//     const randomIndex = Math.floor(Math.random() * digits.length);
//     otp += digits[randomIndex];
//   }

//   console.log(otp);
//   const newOTP = otp;
//   // const phoneNumber = "+1234567890"; // Replace with the destination phone number

//   // const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
//   // const authToken = "YOUR_TWILIO_AUTH_TOKEN";
//   // const client = twilio(accountSid, authToken);

//   // client.messages
//   //   .create({
//   //     body: `Your new OTP is: ${newOTP}`,
//   //     from: "YOUR_TWILIO_PHONE_NUMBER",
//   //     to: phoneNumber,
//   //   })
//   //   .then((message) =>
//   //     console.log("OTP sent successfully. Message SID:", message.sid)
//   //   )
//   //   .catch((error) => console.error("Error sending OTP:", error));

//   //  updatedAstrologer.otp = newOTP;
//   // await updatedAstrologer.save();
//   // return newOTP;

//   res.json({ otp: newOTP }); // Sending the generated OTP in the response
// });

// //================================================> RESEND OTP

// const resendOTP = asyncHandler(async (req, res) => {
//   const astrologerId = req.params.id;

//   try {
//     const astrologer = await Astrologer.findById(astrologerId);
//     if (!astrologer) {
//       return res.status(404).json({ error: "User not found with this id" });
//     }

//     // Generate a new OTP
//     const newOTP = generateOTP();
//     astrologer.otp = newOTP;

//     // Save the updated astrologer
//     await astrologer.save();

//     // Send the new OTP via Twilio
//     sendOTP(astrologer.phoneNumber, newOTP);

//     res.json({ message: "OTP resent successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = {
//   createUser,
//   loginUser,
//   updatedUser,
//   getallUser,
//   getaUser,
//   deleteaUser,
//   forgotPasswordToken,
//   resetPassword,
//   astroProfileVerify,
//   generateOTP,
//   resendOTP,
//   registerWithMobile,
//   verifyOTP
// };
