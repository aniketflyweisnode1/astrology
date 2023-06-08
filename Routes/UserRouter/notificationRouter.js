const router = require("express").Router();

const notification = require("../../Controller/User/NotificationController");
// console.log(notification)
const { isAuthenticated } = require("../../Controller/User/auth.controller");

router.post("/notifications", isAuthenticated, notification.addNotification);
router.get("/notifications", isAuthenticated, notification.getAllNotifications);
router.get("/notifications/:id", notification.getNotificationById);

module.exports = router;
