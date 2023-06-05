const User = require("../../Model/UserModel/User");
const accountSid = "AC8622c6899f4572d141cc5b7a264a1f6d";
const authToken = "95b6c572199028b1b74c24aeffc8ab9a";
const verifySid = "VA84bc752a91abcf7df9f31c76832bafff";
const { encrypt, compare } = require("../../services/crypto");
const bcrypt = require("bcryptjs");
// const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const otp = require("../../services/OTP");
const blog = require("../../Model/UserModel/blog");
const dotenv = require("dotenv");
const otpGenerator = require('otp-generators');
const astrologer = require("../../Model/AstroModel/astrologer");
const Admin = require("../../Model/Admin/AdminModel");
const Wallet = require("../../Model/UserModel/wallet");
var newOTP = require("otp-generators");
dotenv.config({ path: "../.env" });
const { status } = require('express/lib/response');

const generateJwtToken = (id) => {
  return jwt.sign({ id }, JWTkey, {
    expiresIn: "30d",
  });
};

exports.resendOtp = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);

    const user = await User.findById(
      req.params.id,
      { otp: otp },
      { new: true }
    );
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "No User Found ",
      });
    } else {
      // const data = await sendSMS(user.mobile, otp);
      res.status(200).json({
        message: "OTP is Send ",
        otp: otp,
        data: user,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
exports.register = async (req, res) => {
  try {
    const { mobile } = req.body;
    const mobileExists = await User.findOne({ mobile });
    if (mobileExists) {
      return res.status(401).json({
        message: "Mobile Number Already Exists",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = await User.create({ mobile, otp });
    console.log(user);
    res.status(200).json({ message: "OTP is Send ", otp: otp, data: user });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const data = await User.findOne({ otp: req.body.otp });
    if (!data) {
      return res.status(401).json({
        message: "Your Otp is Wrong",
      });
    } else {
      const accessToken = generateJwtToken(data._id.toString());
      res.status(200).json({
        message: "Login Done ",
        accessToken: accessToken,
        userId: data._id,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
// exports.verifyOTP = async (req, res) => {
//   await client.verify.v2.verificationChecks.create({
//       to: `+91${req.body.mobile_Number}`,
//       code: req.body.otp,
//     })
//     .then((data) => {
//       res.status(200).send({
//         status: data.status,
//       });
//       console.log("verified! 👍");
//     })
//     .catch((err) => {
//       res.status(401).json({
//         message: "Wrong OTP entered!",
//       });
//       console.log("wrong OTP !!");
//     });
// };

exports.verifyOTPSignedIn = async (req, res, next) => {
  const user = await User.findOne({ mobile_Number: req.body.mobile_Number });
  console.log(user);
  await User.verify
    .services(verifySid)
    .verificationChecks.create({
      to: `+91${req.body.mobile_Number}`,
      code: req.body.otp,
    })
    .then((data) => {
      createSendToken(user, 201, res);
      console.log("verified! 👍", data);
    })
    .catch((err) => {
      console.log("wrong OTP !!", err);
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    });
};

// SignIn
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    // console.log(password)
    if (!(email && password)) {
      res.status(403).send("All input is required");
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user)
      res.status(402).json({
        message: "This Number is not registered",
      });
    const isPassword = bcrypt.compareSync(password, user.password);
    if (isPassword) {
      jwt.sign({ id: user._id }, JWTkey, (err, token) => {
        if (err) return res.status(401).send("Invalid Credentials");
        console.log(token);
        return res.status(200).send({ user, token });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting Token & check if its there!
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, please login to get access!", 401)
    );
  }

  // 2) Verification of Token
  const decoded = await promisify(jwt.verify)(token, JWTkey);

  // 3) Check if user still exists.
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no  longer Exists!", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    console.log("entered authorization");
    const token =
      req.get("Authorization")?.split("Bearer ")[1] ||
      req.headers.authorization.split(" ")[1];
    console.log(token);

    jwt.verify(token, JWTkey, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "UnAuthorised !",
        });
      }
      // const user = await LoginModel.findOne({ phone: decoded.id });
      // if (!user) {
      //   return res.status(400).send({
      //     message: "The user that this token belongs to does not exist",
      //   });
      // }
      console.log(decoded);
      const user = await User.findById(decoded.id);
      const astro = await astrologer.findById(decoded.id);
      const admin = await Admin.findById(decoded.id);
      console.log(astro, admin, user);
      if (!astro && !admin && !user) {
        return res.status(400).send({
          message: "The user that this token belongs to doesn't exist",
        });
      }

      req.user = user || admin || astro;
      console.log(req.user);
      next();
    });
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};

exports.userMiddleware = async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "Please login to get access",
    });
  } else {
    next();
  }
};

// Verify

module.exports.signUpUser = async (req, res) => {
    const {
        firstName,
        lastName,
        password,
        confirmpassword,
        gallery,
        address,
        email,
        mobile,
        country,
        state,
        district,
        pincode,
        highestQualification,
        collegeOrInstitute,
        passingYear,
        govDocument,
        language,
        rashi,
        desc,
        skills,
        specification,
        fees,
        rating,
        link,
        aboutMe,
        gender,
        dailyhoures,
        experience,
    } = req.body;
    console.log(req.body);

    try {
        // Check if user already exists
        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(402).send({ message: `${mobile} already exists` });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(402).send({ message: `${email} already exists` });
        }

        if (password !== confirmpassword) {
            return res.status(401).json({ message: "Password does not match" });
        }

        const referCode = newOTP.generate(16, {
            alphabets: true,
            upperCase: true,
            specialChar: false,
        });

        const hashedPassword = await bcrypt.hash(password.toString(), 8);
        const confirmPassword = await bcrypt.hash(confirmpassword.toString(), 8);

        const otpGenerated = Math.floor(100 + Math.random() * 9000);

        const newUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                address,
                gallery,
                referCode,
                email,
                mobile,
                country,
                state,
                district,
                pincode,
                highestQualification,
                collegeOrInstitute,
                passingYear,
                govDocument,
                language,
                rashi,
                desc,
                skills,
                specification,
                fees,
                rating,
                link,
                aboutMe,
                gender,
                password: hashedPassword,
                confirmpassword: confirmPassword,
                otp: otpGenerated,
                dailyhoures: parseInt(dailyhoures),
                experience,
            },
            { new: true }
        );

        if (req.body.referCode) {
            const astro = await astrologer.findOne({ referCode: req.body.referCode });
            let id = undefined;
            if (astro) {
                id = astro._id;
            }
            const user1 = await User.findOne({ referCode: req.body.referCode });
            if (user1) {
                id = user1._id;
            }
            if (id !== undefined) {
                const user = await wallet.findOne({ userId: id });
                user.balance += 200;
                user.transactions.push({
                    type: "credit",
                    amount: 200,
                    description: "Refer Bonus",
                });
                await user.save();
            }
        }

        const walletObj = {
            userId: newUser._id.toString(),
            user: newUser._id,
            balance: 0,
        };

        console.log(walletObj);
        const w = await Wallet.create(walletObj);

        newUser.wallet = w;
        await newUser.save();

        const token = generateJwtToken(newUser._id.toString());

        return res.status(201).send({
            message: "Signed up successfully",
            data: newUser,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: { message: error.message } });
    }
};

exports.signup2 = async function (req, res) {
  const { id } = req.params;
  const {
    highestQualification,
    collegeOrInstitute,
    passingYear,
    govDocument,
    experience,
    skills,
  } = req.body;
  try {
    const otpGenerated = Math.floor(100 + Math.random() * 9000);
    const user = await User.findByIdAndUpdate(
      id,
      {
        highestQualification,
        collegeOrInstitute,
        passingYear,
        govDocument,
        experience,
        skills,
        otp: otpGenerated,
      },
      { new: true }
    );
    res.status(200).json({ userId: user._id, otp: otpGenerated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const data = await User.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(401).json({
        message: "Your Otp is Wrong",
      });
    }
    if (data.otp == otp) {
      // await astrologer.findOneAndUpdate(
      //     { _id: req.params.id },
      //     { otp: "" },
      //     { new: true }
      // );
      return res.status(200).json({
        message: "Your Otp is verified",
      });
    }
    return res.status(401).json({
      message: "Your Otp is Wrong",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// SignIn
exports.loginWithMobile = async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.body.mobile });
    if (!user) {
      return res.status(404).send({ message: "you are not registered" });
    }
    const otpGenerated = Math.floor(100 + Math.random() * 9000);
    await User.findOneAndUpdate(
      { mobile: req.body.mobile },
      { otp: otpGenerated },
      { new: true }
    );
    res.status(200).send({ userId: user._id, otp: otpGenerated });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: err.message });
  }
};
exports.verifyMobileOtp = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user);
    if (!user) {
      return res.status(404).send({ message: "you are not found" });
    }
    if (user.otp != req.body.otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    const accessToken = jwt.sign({ id: user._id }, JWTkey, (err, token) => {
      if (err) return res.status(400).send("Invalid Credentials");
      console.log(token);
      res.status(200).send({ token, user });
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user)
      res.status(400).json({
        message: "email is not registered",
      });
    const isPassword = await compare(password, user.password);
    if (isPassword) {
      jwt.sign({ id: user._id }, JWTkey, (err, token) => {
        if (err) return res.status(400).send("Invalid Credentials");
        res.status(200).send({ token, user });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();
    res.status(200).json({
      userId: user._id,
      message: "OTP sent to your registered mobile number",
      otp: otp,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmpassword } = req.body;
    // console.log(password, confirmpassword);
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password not matched" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = bcrypt.hashSync(password, 8);
    user.confirmpassword = bcrypt.hashSync(confirmpassword, 8);
    await user.save();
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

//patch api
module.exports.updateUserProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Update is successfull",
      status: true,
      data: UpdateUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Update is Unsuccessfull",
      status: false,
    });
  }
};

// /get api

module.exports.GetUserProfiles = async (req, res) => {
  // console.log(req.user);
  try {
    const UpdateUser = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "UpdateUser",
      data: UpdateUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
