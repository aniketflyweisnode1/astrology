// const bookidgen = require("bookidgen");
var newOTP = require("otp-generators");
// const Banner = require('../models/Banner')
// const moment = require("moment");
// const product = require('../models/product')
const { encrypt, compare } = require("../../services/crypto");
const verifySid = "VA84bc752a91abcf7df9f31c76832bafff";
const User = require("../../Model/UserModel/User");
const Blog = require("../../Model/UserModel/blog");
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const bcrypt = require("bcryptjs");
const astrologer = require("../../Model/AstroModel/astrologer");
const AstrologerFee = require("../../Model/AstroModel/astrologerFee");
const review = require("../../Model/UserModel/review");
const feedback = require("../../Model/UserModel/feedback");
const Wallet = require("../../Model/UserModel/wallet");
// const wallet = require("../../Model/UserModel/wallet");
const token = require("../../Config/Token");

const sendSMS = async (to, otp) => {
  const from = "+19287568632";
  await client.messages
    .create({
      body: otp,
      from: from,
      to: to,
    })
    .then((message) => {
      console.log(message.sid);
      return message;
    });
};
exports.resendOtp = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = await astrologer.findById(
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
        token,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      token,
    });
  }
};
exports.register = async (req, res) => {
  try {
    const { mobile } = req.body;
    const mobileExists = await astrologer.findOne({ mobile });
    if (mobileExists) {
      return res.status(401).json({
        message: "Mobile Number Already Exists",
      });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = await astrologer.create({ mobile, otp });
    console.log(user);
    res.status(200).json({ message: "OTP is Send ", otp: otp, data: user });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.signUpUser = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    confirmpassword,
    gallery,
    address,
    email,
    // mobile,
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

  // Check if user already exist
  // const Existing = await astrologer.findOne({ mobile });
  // if (Existing) {
  //     return res.status(402).send({ message: ` ${mobile} already exists` });
  // }
  const emailRegistered = await astrologer.findOne({ email });
  if (emailRegistered) {
    return res.status(402).send({ message: ` ${email}` + " already exists" });
  }
  if (password !== confirmpassword) {
    res.status(401).json({ message: "Password is not match " });
  }
  encryptedPassword = await bcrypt.hash(password, 10);
  const referCode = newOTP.generate(10, {
    alphabets: true,
    upperCase: true,
    specialChar: false,
  });
  const hashedPassword = await encrypt(password);
  const confirmPassword = await encrypt(confirmpassword);
  const otpGenerated = Math.floor(100 + Math.random() * 9000);
  const discountedFee = req.body.discountedFee ? req.body.discountedFee : fees;
  try {
    const newUser = await astrologer.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        address,
        gallery,
        referCode,
        email,
        // mobile,
        country,
        discountedFee,
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
        experience: experience,
      },
      { new: true }
    );
    if (req.body.referCode) {
      const astro = await astrologer.findOne({
        referCode: req.body.referCode,
      });
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
          transactionName: "refer",

          amount: 200,
          description: "Refer Bonus",
        });
        await user.save();
        // console.log(u);
      }
    }
    const walletObj = {
      userId: newUser._id.toString(),
      astrologer: newUser._id,
      balance: 0,
    };
    console.log(walletObj);
    const w = await Wallet.create(walletObj);
    console.log("Wallet created ", w);
    // sendSMS(`+91${mobile_Number}`, otpGenerated)
    newUser.wallet = w;
    await newUser.save();
    return res.status(200).send({
      message: "signed Up successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
    const user = await astrologer.findByIdAndUpdate(
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

    const data = await astrologer.findOne({ _id: req.params.id });
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
    const Astrologer = await astrologer.findOne({ mobile: req.body.mobile });
    if (!Astrologer) {
      return res.status(404).send({ message: "you are not registered" });
    }
    const otpGenerated = Math.floor(1000 + Math.random() * 9000);
    // const token = token.generateJwtToken(Astrologer._id);
    // console.log(token),
    await astrologer.findOneAndUpdate(
      { mobile: req.body.mobile },
      { otp: otpGenerated },

      { new: true }
    );
    const token1 = token.generateJwtToken(Astrologer._id);
    //   console.log(token1);
    res.setHeader("x-api-key", /* "Bearer "*/ +token);
    res
      .status(200)
      .send({ AstrologerId: Astrologer._id, otp: otpGenerated, token: token1 });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: err.message });
  }
};

exports.verifyMobileOtp = async (req, res) => {
  try {
    const user = await astrologer.findById(req.params.id);
    // console.log(user);
    if (!user) {
      return res.status(404).send({ message: "you are not found" });
    }
    // console.log(user.otp, " ", req.body.otp);
    // console.log(parseInt(user.otp) == req.body.otp);
    if (user.otp != req.body.otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    const accessToken = jwt.sign({ id: user._id }, JWTkey, (err, token) => {
      if (err) return res.status(400).send("Invalid Credentials");
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

    const user = await astrologer.findOne({ email });

    if (!user)
      res.status(400).json({
        message: "email is not registered",
      });
    const isPassword = await compare(password, user.password);
    if (isPassword) {
      jwt.sign({ id: user._id }, JWTkey, (err, token) => {
        if (err) return res.status(400).send("Invalid Credentials");
        res.status(200).send({ user, token });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.ViewDataProfiles = async (req, res) => {
  try {
    const getDetails = await astrologer.findById(req.params.id);
    if (!getDetails) {
      res.status(400).json({
        message: "Enter the correct id",
        status: false,
      });
    } else {
      res.status(200).json({
        message: "Astrologer Details retrieved Successfully",
        data: getDetails,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};
const Product = require("../../Model/UserModel/product");
exports.SearchAstroNameLangSkills = async (req, res) => {
  const search = req.params.key;
  try {
    const student = await astrologer.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { Skills: { $regex: search, $options: "i" } },
        { Language: { $regex: search, $options: "i" } },
      ],
    });
    const product = await Product.find({
      $or: [
        { productName: { $regex: search, $options: "i" } },
        { productCategory: { $regex: search, $options: "i" } },
      ],
    });
    if (student.length == 0 && product.length == 0) {
      res.status(404).json({ message: "data  not Found", status: false });
    } else {
      res.status(200).json({
        message: " Data  is found Successfully",
        astrologer: student,
        product: product,
        status: true,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message, status: false });
  }
};
exports.getAstrolgerById = async (req, res) => {
  try {
    const getDetails = await astrologer.findById(req.params.id).lean();
    // .select({ _id: 1, firstName: 1, lastName: 1, skills: 1, aboutMe: 1, language: 1, specification: 1 });
    if (!getDetails) {
      res.status(400).json({
        message: "Enter the correct id",
        status: false,
      });
    }
    res.status(200).json({
      data: getDetails,
      status: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message, status: false });
  }
};

exports.updateAstrologer = async (req, res) => {
  try {
    const {
      addLanguages,
      image,
      fixedSessionDiscountStatus,
      addSkills,
      discountedFee,
      addSpecification,
      removeLanguages,
      removeSkills,
      removeSpecification,
      fees,
      aboutMe,
      consultationMinutes,
    } = req.body;

    const updateFields = {
      fees,
      aboutMe,
      discountedFee,
      consultationMinutes,
      fixedSessionDiscountStatus,
    };

    const updateOptions = { new: true };

    if (
      addLanguages ||
      addSkills ||
      discountedFee ||
      addSpecification ||
      fees ||
      aboutMe ||
      consultationMinutes
    ) {
      const languagesToAdd = addLanguages ? addLanguages.split() : [];
      const skillsToAdd = addSkills ? addSkills.split() : [];

      const updateQuery = {
        $set: updateFields,
        $push: {
          language: { $each: languagesToAdd },
          skills: { $each: skillsToAdd },
        },
        $addToSet: { specification: addSpecification },
      };

      await astrologer.findOneAndUpdate(
        { _id: req.params.id },
        updateQuery,
        updateOptions
      );
      console.log("add");
    }

    if (removeLanguages || removeSkills || removeSpecification) {
      const updateQuery = {
        $pull: {
          language: { $in: removeLanguages },
          skills: { $in: removeSkills },
          specification: { $in: removeSpecification },
        },
      };

      await astrologer.findOneAndUpdate(
        { _id: req.params.id },
        updateQuery,
        updateOptions
      );
      console.log("remove");
    }

    if (image) {
      const updateQuery = {
        profileImage: { url: req.file.location, key: req.file.key },
      };

      await astrologer.findOneAndUpdate(
        { _id: req.params.id },
        updateQuery,
        updateOptions
      );
    }

    res.status(200).json({
      message: "Profile updated successfully",
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().lean();
    if (blogs.length === 0) {
      return res.status(404).send({ message: "No blogs found" });
    }
    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

//Delete User--
exports.deleteAstroName = async (req, res) => {
  try {
    const DeleteUser = await astrologer.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!DeleteUser) {
      res.json({ message: "Enter the corret User  Name", status: false });
    } else {
      res.status(200).json({
        message: "User removed successfully",
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

exports.deleteLanguages = async (req, res) => {
  try {
    const DeleteUser = await astrologer.findOneAndDelete({
      $or: [{ Languages: { $regex: search, $options: "i" } }],
    });
    if (!DeleteUser) {
      res.json({
        message: "Enter the corret User Languages",
        status: false,
      });
    } else {
      res.status(200).json({
        message: "Languages removed successfully",
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

exports.GetAllAstro = async (req, res) => {
  try {
    // const users = await astrologer.find();
    const astro = await astrologer.find();
    if (!astro || astro.length === 0) {
      return res.status(400).json({ message: "astrologer not found" });
    }

    res.status(200).json({
      status: "success",
      data: astro,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

exports.getastroById = async (req, res) => {
  try {
    // const users = await astrologer.find();
    const astro = await astrologer.findById(req.params.id).lean();
    if (!astro) {
      return res.status(400).json({ message: "astrologer not found" });
    }

    res.status(200).json({
      status: "success",
      data: astro,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

exports.updateAstro = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      confirmpassword,
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
      profileImage,
      fixedSessionDiscountStatus,
      discountPercentage,
      rating,
      link,
      aboutMe,
      gender,
      dailyhoures,
      experience,
    } = req.body;
    const astro = await astrologer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        password,
        confirmpassword,
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

        aboutMe,
        gender,

        experience,
      },
      { new: true }
    );
    if (discountPercentage && astro.fixedSessionDiscountStatus) {
      await AstrologerFee.findOneAndUpdate(
        {
          astrologerId: astro._id,
        },
        { discountPercentage: discountPercentage },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Updated",
    });
  } catch (err) {
    console.log(err);
    res.state(400).json({
      err: err.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await astrologer.findOne({ email });
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
    const user = await astrologer.findById(id);
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
exports.getAstro = async (req, res) => {
  try {
    const astro = await astrologer.findById().lean();
    if (!astro) {
      return res.status(400).json({ message: "astrologer not found" });
    }
    res.status(200).json({ message: "success", data: astro });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "something went wrong ",
    });
  }
};
exports.updateProfile1 = async (req, res) => {
  try {
    const profile = { url: req.file.location, key: req.file.key };
    const astro = await astrologer.findByIdAndUpdate(
      req.params.id,
      { profileImage: profile },
      { new: true }
    );
    res.status(200).json({ message: "success", data: astro });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "something went wrong ",
    });
  }
};
