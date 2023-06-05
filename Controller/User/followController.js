const Follow = require("../../Model/UserModel/Follow");
const User = require("../../Model/UserModel/User");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const Astrologer = require("../../Model/AstroModel/astrologer");
const Notification = require("../../Model/UserModel/notification");

exports.follow = async (req, res, next) => {
    try {
        let followee = req.params.id;

        const astrologer = await Astrologer.findById(followee);

        if (!astrologer) {
            return res.status(404).json({
                message: "Astrologer not found",
            });
        }
        req.user.following.push(astrologer._id);
        astrologer.followers.push(req.user._id);
        await req.user.save();
        await astrologer.save();
        const u = await Notification.create({
            astrologerId: astrologer._id,
            message: `${req.user.firstName} followed you`,
        });
        console.log(u);
        res.status(200).json({
            message: `${req.user.firstName} followed ${astrologer.firstName}`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.unFollow = async (req, res) => {
    try {
        let followee = req.params.id;

        const astrologer = await Astrologer.findById(followee);

        if (!astrologer) {
            return res.status(404).json({
                message: "Astrologer not found",
            });
        }
        req.user.following.remove(astrologer._id);
        astrologer.followers.remove(req.user._id);
        await req.user.save();
        const a = await astrologer.save();
        console.log(a);
        res.status(200).json({
            message: `${req.user.firstName} unfollowed ${astrologer.firstName}`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.followers = async (req, res) => {
    try {
        const user = await Astrologer.findById(req.params.id)
            .populate("followers")
            .lean()
            .select({ followers: 1 });
        if (!user) {
            return res.status(404).json({ message: "No astrologer found" });
        }
        if (!user.followers.length) {
            return res.status(404).json({ message: "No followers found" });
        }
        res.status(200).json({
            data: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.followingOfUser = async (req, res) => {
    const maxLimit = 50;
    const limit = Math.min(50, req.query.limit);
    const skip = req.query.page * limit;
    const user = await User.findById(req.params.id)
        .select({ following: 1 })
        .populate({
            path: "following",
            options: {
                limit,
                skip,
            },
        })
        .lean();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (!user.following.length) {
        return res.status(404).json({ message: "No following found" });
    }
    res.status(200).json({
        data: user,
    });
};
