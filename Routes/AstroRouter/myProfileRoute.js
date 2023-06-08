const express = require("express");
const {
  Profile,
  getProfile,
  getSingleProfile,
  AddFollower,
  CreatePostProfile,
} = require("../../Controller/Astrologer/myProfileCtrl");

const verfiyToken = require("../../Middleware/auth");

const myProfileRouter = express.Router();

myProfileRouter.post("/profiles", Profile);
myProfileRouter.get("/profiles", verfiyToken, getProfile);
myProfileRouter.get("/profiles/:profileId", getSingleProfile);
myProfileRouter.post("/profiles", verfiyToken, AddFollower);
myProfileRouter.post("/profiles/: profileId / posts", verfiyToken, CreatePostProfile);

module.exports = myProfileRouter;
