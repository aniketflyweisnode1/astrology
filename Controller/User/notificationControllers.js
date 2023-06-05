// const notification = require("../models/Notification");

// exports.AddNotification = async (req, res) => {
//     try {
//         const Data = await notification.create(req.body);
//         res.status(200).json({
//             data: Data,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             message: err.message,
//         });
//     }
// };

// exports.updateNotification = async (req, res) => {
//     try {
//         const updated = await notification.findByIdAndUpdate(
//             { _id: req.params.id },
//             req.body,
//             {
//                 new: true,
//             }
//         );
//         if (!updated) {
//             return res.status(404).json({ message: "Not found" });
//         }
//         res.status(200).json({
//             message: "Updated",
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             message: err.message,
//         });
//     }
// };

// exports.getNotification = async (req, res) => {
//     try {
//         const data = await notification.find();

//         res.status(200).json({
//             data: data,
//             message: "notification fetched",
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             message: err.message,
//         });
//     }
// };

// exports.deleteNotification = async (req, res) => {
//     try {
//         const deletedNotification = await notification.findByIdAndDelete({
//             _id: req.params.id,
//         });
//         if (!deletedNotification) {
//             return res.status(404).json({ message: "notification not found" });
//         }
//         res.status(200).json({
//             message: "Deleted  ",
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             message: err.message,
//         });
//     }
// };
