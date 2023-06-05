const express = require("express");
const router = express.Router();
const astrologerLiveScheduleController = require("../../Controller/Astrologer/astrologerLiveSchedule");

// CREATE a new live schedule for an astrologer
router.post(
    "/live-schedule",
    astrologerLiveScheduleController.createAstrologerLiveSchedule
);

// READ all live schedules for an astrologer
router.get(
    "/live-schedule/:astrologerId",
    astrologerLiveScheduleController.getAllAstrologerLiveSchedules
);

// UPDATE a live schedule for an astrologer
router.put(
    "/live-schedule/:id",
    astrologerLiveScheduleController.updateAstrologerLiveSchedule
);

// DELETE a live schedule for an astrologer
router.delete(
    "/live-schedule/:id",
    astrologerLiveScheduleController.deleteAstrologerLiveSchedule
);

module.exports = router;
