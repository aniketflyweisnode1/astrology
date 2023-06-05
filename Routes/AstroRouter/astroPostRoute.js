const express = require("express");
const {
  createAstroPost,
  getAllPost,
  updatePost,
  deletePost,
  // getSinglePost,
  // getMyPost,
  getPost,
  likeThePost,
  shareThePost,
} = require("../../Controller/Astrologer/astroPostCtrl");

const astroPost = express.Router();
astroPost.post("/create-post", createAstroPost);
astroPost.get("/get-all-post", getAllPost);
// astroPost.get("/get-post/:id", getSinglePost);
astroPost.put("/update-post/:id", updatePost);
astroPost.delete("/delete-post/:id", deletePost);
// astroPost.get("/my-post/:userId", getMyPost);
astroPost.get("/:id", getPost);
astroPost.get("/my-post/:userId", getPost)
astroPost.put("/like", likeThePost);
astroPost.post("/:id/share", shareThePost);



module.exports = astroPost;
