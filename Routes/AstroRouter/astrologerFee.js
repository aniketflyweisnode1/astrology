const express = require("express");
const router = express.Router();

const astrologerFeeController = require("../../Controller/Astrologer/astrologerFee");

// Create a new astrologer fee record
router.post("/astrologer-fee", astrologerFeeController.createAstrologerFee);

// Get all astrologer fee records
router.get("/astrologer-fee", astrologerFeeController.getAstrologerFees);

// Get a single astrologer fee record by ID
router.get("/astrologer-fee/:id", astrologerFeeController.getAstrologerFeeById);
router.get(
    "/users/:userId/astrologer-fee/:id",
    astrologerFeeController.getAstrologerFeeByUser
);
// Update an existing astrologer fee record by ID
router.patch(
    "/astrologer-fee/:id",
    astrologerFeeController.updateAstrologerFee
);

// Delete an existing astrologer fee record by ID
router.delete(
    "/astrologer-fee/:id",
    astrologerFeeController.deleteAstrologerFee
);

module.exports = router;
