const express = require("express");
const router = express.Router();
const privacyController = require("../../Controller/User/privacy");

const verfiyToken = require("../../Middleware/auth");

// Create privacy policy
router.post("/privacy", verfiyToken, privacyController.createPrivacy);

// Get privacy policy
router.get("/privacy", verfiyToken, privacyController.getPrivacy);

// Update privacy policy
router.put("/privacy/:id", verfiyToken, privacyController.updatePrivacy);

// Delete privacy policy
router.delete("/privacy/:id", verfiyToken, privacyController.deletePrivacy);

module.exports = router;
