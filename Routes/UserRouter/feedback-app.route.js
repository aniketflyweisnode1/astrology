const express = require("express");
const router = express.Router();
const feedbackController = require("../../Controller/User/feedback-app");

// Create feedback
router.post("/", feedbackController.createFeedback);

// Get feedback by ID
router.get("/:id", feedbackController.getFeedback);

// Update feedback by ID
router.put("/:id", feedbackController.updateFeedback);
router.get("/", feedbackController.getFeedbacks);
// Delete feedback by ID
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
