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
  dislikeThePost,
  shareThePost,
  addCommentToPost,
  getUsersWhoLikedPost,
} = require("../../Controller/Astrologer/astroPostCtrl");

const upload = require("../../services/upload");


const verfiyToken = require("../../Middleware/auth");


const astroPost = express.Router();
astroPost.post("/create-post", verfiyToken, upload.single("image"), createAstroPost);
astroPost.get("/get-all-post", verfiyToken, getAllPost);
// astroPost.get("/get-post/:id", getSinglePost);
astroPost.put("/update-post/:id", verfiyToken, upload.single("image"), updatePost);
astroPost.delete("/delete-post/:id", verfiyToken, deletePost);
// astroPost.get("/my-post/:userId", getMyPost);
astroPost.get("/:id", verfiyToken, getPost);
astroPost.get("/my-post/:userId", verfiyToken, getPost)
astroPost.put("/like", verfiyToken, likeThePost);
// astroPost.put("/dislike", verfiyToken, dislikeThePost);
astroPost.post("/:id/share", verfiyToken, shareThePost);
astroPost.post("/add-comment", verfiyToken, addCommentToPost);
astroPost.get("/posts/:postId/likes", verfiyToken, getUsersWhoLikedPost);





module.exports = astroPost;
