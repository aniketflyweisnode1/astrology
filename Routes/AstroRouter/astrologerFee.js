const express = require("express");
const router = express.Router();

const astrologerFeeController = require("../../Controller/Astrologer/astrologerFee");

const verfiyToken = require("../../Middleware/auth");

// Create a new astrologer fee record
router.post("/astrologer-fee", verfiyToken, astrologerFeeController.createAstrologerFee);

// Get all astrologer fee records
router.get("/astrologer-fee", verfiyToken, astrologerFeeController.getAstrologerFees);

// Get a single astrologer fee record by ID
router.get("/astrologer-fee/:id", verfiyToken, astrologerFeeController.getAstrologerFeeById);
router.get(
    "/users/:userId/astrologer-fee/:id", verfiyToken,
    astrologerFeeController.getAstrologerFeeByUser
);
// Update an existing astrologer fee record by ID
router.patch(
    "/astrologer-fee/:id", verfiyToken,
    astrologerFeeController.updateAstrologerFee
);

// Delete an existing astrologer fee record by ID
router.delete(
    "/astrologer-fee/:id", verfiyToken,
    astrologerFeeController.deleteAstrologerFee
);

module.exports = router;
