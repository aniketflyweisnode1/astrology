const User = require("../../Model/UserModel/User");
const Blog = require("../../Model/UserModel/blog");
const feedback = require("../../Model/UserModel/feedback");
const astroSttus = require("../../Model/AstroModel/astroStatus");
const astrologer = require("../../Model/AstroModel/astrologer");
// const UserDetail = require('../models/userDetails')
//post api--

module.exports.postuserProfiles = async (req, res) => {
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
        language,
        rashi,
        desc,
        skills,
    } = req.body;
    if (!firstName && !lastName && !email && !password && !confirmpassword) {
        return res.status(501).json({
            message: "All field are require",
        });
    }

    // Check if user already exist
    const Existing = await astrologer.findOne({ mobile });
    if (Existing) {
        return res.send("Already existing");
    }
    if (password !== confirmpassword) {
        res.state(400).json({ message: "Password is not match " });
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    // create new user

    try {
        const hashedPassword = await encrypt(password);
        const confirmPassword = await encrypt(confirmpassword);
        const otpGenerated = Math.floor(1000 + Math.random() * 90000);
        const newUser = await User.create({
            firstName,
            lastName,
            address,
            email,
            mobile,
            country,
            district,
            pincode,
            language,
            rashi,
            desc,
            skills,
            password: hashedPassword,
            confirmpassword: confirmPassword,
            otp: otpGenerated,
        });

        if (req.body.referCode) {
            const astro = await astrologer.findOne({
                referCode: req.body.referCode,
            });
            const user1 = await User.findOne({ referCode: req.body.referCode });
            if (astro || user1) {
                const id = astro._id || user1._id;
                const user = await wallet.findOne({ userId: id });
                user.balance += 200;
                user.transactions.push({
                    type: "credit",
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
        return res.status(201).json({ message: "signedup successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "internal server error " + error.message,
        });
    }
};

//get api

module.exports.ViewDataProfiles = async (req, res) => {
    try {
        const getDetails = await User.findById(req.params.id);
        if (!getDetails) {
            res.status(400).json({
                message: "Enter the correct id",
                status: false,
            });
        } else {
            res.status(200).json({
                message: "User Details is Created successfully",
                data: getDetails,
                status: true,
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};

//patch api

// module.exports.updateUserProfile = async (req, res) => {
//   const id = req.params.id;
//   let photo = req.body;
//   photo["User_Images"] = [req.file.originalname];
//   const {
//     User_ID,
//     User_Name,
//     Experince,
//     Skills,
//     AboutMe,
//     User_Images,
//     Languages,
//   } = req.body;

//   // console.log("req.user", req.user);
//   if (
//     !(
//       User_ID &&
//       User_Name &&
//       Experince &&
//       Skills &&
//       AboutMe &&
//       User_Images &&
//       Languages
//     )
//   )
//     res.status(400).json({ message: "Required fields" });
//   const UpdateUser = await User.findByIdAndUpdate(id, {
//     User_ID,
//     User_Name,
//     Experince,
//     Skills: JSON.parse(Skills),
//     AboutMe,
//     User_Images,
//     Languages: JSON.parse(Languages),
//   });
//   if (!UpdateUser) {
//     res.status(400).json({ message: "Enter the correct Id", status: false });
//   } else {
//     res.status(200).json({
//       message: "Udpate is successfully",
//       status: true,
//       UpdateUser,
//     });
//   }
// };
//get profile of user
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Patch Id
exports.updateUserProfile = async (req, res) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        res.status(200).json({
            message: "Updated Done ",
        });
    } catch (err) {
        console.log(err);
        res.state(400).json({
            err: err.message,
        });
    }
};

//Search api
module.exports.SearchUserNameLangSkills = async (req, res) => {
    const search = req.query.search;
    try {
        const student = await User.find({
            $or: [
                { User_Name: { $regex: search, $options: "i" } },
                { Skills: { $regex: search, $options: "i" } },
                { Languages: { $regex: search, $options: "i" } },
            ],
        });
        if (student.length == 0) {
            res.json({ message: "Data is not Found", status: false });
        } else {
            res.json({
                message: " Data  is found Successfully",
                student: student,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

// Serach api User Name
module.exports.SearchUserName = async (req, res) => {
    const search = req.query.search;
    try {
        const student = await User.find({
            User_Name: search,
        });
        if (student.length == 0) {
            res.json({ message: "This User was not Found", status: false });
        } else {
            res.json({
                message: " USer  is found",
                student: student,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

//seacrh for languseg get api
module.exports.SearchAnyLanguagesName = async (req, res) => {
    const search = req.query.search;
    try {
        const student = await User.find({
            $or: [{ Languages: { $regex: search, $options: "i" } }],
        });
        if (student.length == 0) {
            res.json({ message: "This Languages Is not Found", status: false });
        } else {
            res.json({
                message: "Languages  is found",
                student: student,
                status: true,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

//Delete User--
module.exports.deleteUserName = async (req, res) => {
    try {
        const DeleteUser = await User.findOneAndDelete({
            _id: req.params.id,
        });
        if (!DeleteUser) {
            res.status(404).json({ message: "user not found", status: false });
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

//delete Languages
module.exports.deleteLanguages = async (req, res) => {
    try {
        const DeleteUser = await User.findOneAndDelete({
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

//
module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
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

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({ data: user });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};

// FeedBack
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.UserFeedback = async (req, res) => {
    let { UserId, Feedback, rating, astroId } = req.body;

    try {
        if (!(UserId && Feedback && astroId)) {
            res.status(402).json({
                message: "All fields are required",
                status: false,
            });
        }

        const userData = await User.findById({ _id: UserId });
        // console.log(userData);
        const data = {
            UserId: UserId,
            Feedback: Feedback,
            name: userData.firstName + " " + userData.lastName,
            astroId: astroId,
            rating: rating,
        };
        const NewUserFeedback = await feedback.create(data);
        const result = await feedback.aggregate([
            { $match: { astroId: new ObjectId(astroId) } },
            { $group: { _id: "$astroId", avgRating: { $avg: "$rating" } } },
        ]);

        // console.log(result[0]?.avgRating);
        await astrologer.findByIdAndUpdate(
            { _id: astroId },
            { averageRating: result[0]?.avgRating },
            { new: true }
        );
        res.status(200).json({
            message: "UserFeedback Send",
            data: NewUserFeedback,
            status: true,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message, status: false });
    }
};

exports.GetAllFeedBack = async (req, res) => {
    try {
        let queryObj = { ...req.query };

        const data = await feedback.find(queryObj).sort({ rating: -1 }).lean();
        // console.log(data);
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const data = await feedback.findOne({ userId: req.params.id });
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const data = await feedback.findOne(
            { userId: req.params.id },
            req.body,
            { new: true }
        );
        if (!data) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json({
            data: data,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
exports.deleteFeedback = async (req, res) => {
    try {
        const data = await feedback.findOneAndDelete({
            userId: req.params.id,
        });
        if (!data) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.GetAstroliveChanges = async (req, res) => {
    try {
        const data = await astroSttus.find({ status: true }).limit(5).sort();
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.GetAstroUpcoming = async (req, res) => {
    try {
        const data = await astroSttus.find({ status: false }).limit(5).sort();
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
