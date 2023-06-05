// const Conection = require('../models/conection');

const catchAsync = require("../utils/catchAsync");

//Follow---
 exports.Follow = catchAsync(async (req, res) => {
  const { userID, followersID, status } = req.body;
  let conection = await Conection.create({ userID, followersID, status });
  res.status(200).json({ message: "Follow request sent", conection });
});

//getAllActiveFollowing--
 exports.GetAllActiveFollowing = async (req, res) => {
  try {
    const userID = req.params.id;
    let conection = await Conection.find({ userID })
      .where("status")
      .equals("active");
    res.status(200).json({ message: "Active Following", conection });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//GetallPendingFollowing
 exports.GetAllPendingFollowing = async (req, res) => {
  try {
    const userID = req.params.id;
    let conection = await Conection.find({ userID })
      .where("status")
      .equals("pending");
    res.status(200).json({ message: "Pending Following", conection });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//GetAllActiveFollow

 exports.GetAllActiveFollow = async (req, res) => {
  try {
    const followersID = req.params.id;
    let conection = await Conection.find({ followersID })
      .where("status")
      .equals("active");
    res
      .status(200)
      .json({ message: "Active Fellow Views", data: conection, Status: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//GetallPendingFollow--
 exports.GetAllPendingFollow = async (req, res) => {
  try {
    const followersID = req.params.id;
    let conection = await Conection.find({ followersID })
      .where("status")
      .equals("pending");
    res.status(200).json({
      message: "All Pending Fellow",
      conection: conection,
      status: true,
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
};
//Unfollow--
 exports.Unfollow = async (req, res) => {
  try {
    const id = req.params.id;
    let conection = await Conection.deleteOne({ _id: id });
    res.status(200).json(conection);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//AcceptFollowingRequest---
 exports.AcceptFollowingRequest = async (req, res) => {
  try {
    const id = req.params.id;
    let conection = await Conection.findOneAndUpdate(
      { _id: id },
      { status: "active" }
    );

    res.status(200).json(conection);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
