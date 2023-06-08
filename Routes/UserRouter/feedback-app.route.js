const express = require("express");
const router = express.Router();
const feedbackController = require("../../Controller/User/feedback-app");

const verfiyToken = require("../../Middleware/auth");

// Create feedback
router.post("/", verfiyToken, feedbackController.createFeedback);

// Get feedback by ID
router.get("/:id", feedbackController.getFeedback);

// Update feedback by ID
router.put("/:id", verfiyToken, feedbackController.updateFeedback);
router.get("/", feedbackController.getFeedbacks);
// Delete feedback by ID
router.delete("/:id", verfiyToken, feedbackController.deleteFeedback);

module.exports = router;
