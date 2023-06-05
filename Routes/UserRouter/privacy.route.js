const express = require("express");
const router = express.Router();
const privacyController = require("../../Controller/User/privacy");

// Create privacy policy
router.post("/privacy", privacyController.createPrivacy);

// Get privacy policy
router.get("/privacy", privacyController.getPrivacy);

// Update privacy policy
router.put("/privacy/:id", privacyController.updatePrivacy);

// Delete privacy policy
router.delete("/privacy/:id", privacyController.deletePrivacy);

module.exports = router;
