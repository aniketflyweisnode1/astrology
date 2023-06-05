const express = require("express");
const {
  createAstrologerLiveSchedule,
  getAllAstrologerLiveSchedules,
  deleteAstrologerLiveSchedule,
} = require("../../Controller/Astrologer/astrologerLiveSchedule");
const astroLive = express.Router();

astroLive.post("/live-schedule", createAstrologerLiveSchedule);
astroLive.get("/getlive/:astrologerId", getAllAstrologerLiveSchedules);
astroLive.put("/updatelive/:id", getAllAstrologerLiveSchedules);
astroLive.delete (
  "/deletelive/:id", deleteAstrologerLiveSchedule);

module.exports = astroLive;
