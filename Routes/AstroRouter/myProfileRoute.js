const express = require("express");
const {
  Profile,
  getProfile,
  getSingleProfile,
  AddFollower,
  CreatePostProfile,
} = require("../../Controller/Astrologer/myProfileCtrl");

const myProfileRouter = express.Router();

myProfileRouter.post("/profiles", Profile);
myProfileRouter.get("/profiles", getProfile);
myProfileRouter.get("/profiles/:profileId", getSingleProfile);
myProfileRouter.post("/profiles", AddFollower);
myProfileRouter.post("/profiles/: profileId / posts", CreatePostProfile);

module.exports = myProfileRouter;
