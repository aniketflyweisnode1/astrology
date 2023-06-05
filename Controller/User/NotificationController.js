// const UserSetting = require("../models/userSetting");
const User = require("../../Model/UserModel/User");
const Astrologer = require("../../Model/AstroModel/astrologer");
const Notification = require("../../Model/UserModel/notification");
module.exports.UserSettings = async (req, res) => {
    try {
        if (!(UserId && ActiveNotification)) {
          res.json({ message: "All fields are required", status: false });
        } else {
          const SettingUser = await UserSetting.findOne({ UserId });
          if (!SettingUser) {
            const NewUserSetting = await UserSetting.create({
              UserId,
              ActiveNotification,
            });
            if (NewUserSetting)
              res.status(200)({
                message: "UserSetting Updated",
                data: NewUserSetting,
                status: true,
              });
            res
              .status(400)
              .json({ message: "Usersetting  not Updated", status: false });
          } else {
            const UpdateUserSetting = await UserSetting.findOneAndUpdate(
              { UserId },
              { ActiveNotification }
            );
            if (UpdateUserSetting)
              res
                .status(200)
                .json({
                  message: "UserSetting Updated",
                  data: UpdateUserSetting,
                  status: true,
                });
            res
              .status(400)
              .json({ message: "Usersetting  not Updated", status: false });
          }
        }

        const user = await User.findById(req.params.id);
        user.ActiveNotification = true;
        await user.save();
        res.status(201).json({ message: user });
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};
exports.addNotification = async (req, res) => {
    try {
        if (!req.body.message) {
            res.status(400).json({ message: "message is required" });
        }
        const notification = await Notification.create(req.body);
        res.status(200).json({
            message: "Notification added successfully",
            data: notification,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.sendNotification = async (req, res) => {
    try {
        const user = await User.find({ ActiveNotification: true });
        console.log(user);
        res.send({
            message: "All the users who have opted to receive notifications",
            data: user,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const notifications = await Notification.find(queryObj)
            .lean()
            .sort("-created");
        if (notifications.length === 0) {
            return res.status(404).json({
                message: "No notifications found",
            });
        }
        res.status(200).json({
            data: notifications,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
        });
    }
};
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id).lean();

        if (!notification) {
            return res.status(404).json({
                message: "No notification found",
            });
        }

        res.status(200).json({
            data: notification,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
