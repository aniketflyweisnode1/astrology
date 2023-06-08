const express = require("express");
const router = express.Router();
const blogController = require("../../Controller/User/blog.controller");
const upload = require("../../services/upload");

const verfiyToken = require("../../Middleware/auth");

// GET /api/blogs
router.get("/blogs", verfiyToken, blogController.getBlogs);

// POST /api/blogs
router.post("/blogs", verfiyToken, upload.single("image"), blogController.createBlog);

// GET /api/blogs/:id
router.get("/blogs/:id", verfiyToken, blogController.getBlogById);

// PUT /api/blogs/:id
router.put("/blogs/:id", verfiyToken, blogController.updateBlogById);

// DELETE /api/blogs/:id
router.delete("/blogs/:id", verfiyToken, blogController.deleteBlogById);

module.exports = router;
