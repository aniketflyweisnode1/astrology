const AstrologerLiveSchedule = require("../../Model/AstroModel/astrologerLiveScheduleModel");

// const createAstrologerLiveSchedule = async (req, res) => {
//   try {
//     const astrologerLiveSchedule = new AstrologerLiveSchedule(req.body);
//     await astrologerLiveSchedule.save();
//     res.status(201).json({
//       message: "schedule added",
//       data: astrologerLiveSchedule,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

  const createAstrologerLiveSchedule = async (req, res) => {
    try {
      const astrologerLiveSchedule = new AstrologerLiveSchedule(req.body);
      await astrologerLiveSchedule.save();
      res.status(201).json({
        message: "schedule added",
        data: astrologerLiveSchedule,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
const getAllAstrologerLiveSchedules = async (req, res) => {
  try {
    const astrologerId = req.params.astrologerId;
    const astrologerLiveSchedules = await AstrologerLiveSchedule.find({
      astrologerId,
    }).lean();
    res.status(200).json({ data: astrologerLiveSchedules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a live schedule for an astrologer
const updateAstrologerLiveSchedule = async (req, res) => {
  try {
    const astrologerLiveScheduleId = req.params.id;
    const astrologerLiveSchedule =
      await AstrologerLiveSchedule.findByIdAndUpdate(
        astrologerLiveScheduleId,
        req.body,
        { new: true }
      );
    res.status(200).json({ data: astrologerLiveSchedule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a live schedule for an astrologer
const deleteAstrologerLiveSchedule = async (req, res) => {
  try {
    const astrologerLiveScheduleId = req.params.id;
    await AstrologerLiveSchedule.findByIdAndDelete(
      astrologerLiveScheduleId
    );
    res.status(200).json({
      message: "Astrologer live schedule deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAstrologerLiveSchedule,
  getAllAstrologerLiveSchedules,
  updateAstrologerLiveSchedule,
  deleteAstrologerLiveSchedule
};
