const router = require("express").Router();
const astrologerController = require("../../Controller/Astrologer/astroStatusControllers");

// POST route for adding new astrologer status
router.post("/astrologers/:id/status", astrologerController.AddStatus);
router.get("/astrologers/:id/status", astrologerController.getStatus);
// GET route for retrieving astrologer status
router.put("/astrologers/:id/status", astrologerController.updateStatus);
router.get("/astrologers-live", astrologerController.getAllStatus);
module.exports = router;
