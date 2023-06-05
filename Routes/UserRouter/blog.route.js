const express = require("express");
const router = express.Router();
const blogController = require("../../Controller/User/blog.controller");
const upload = require("../../services/upload");

// GET /api/blogs
router.get("/blogs", blogController.getBlogs);

// POST /api/blogs
router.post("/blogs", upload.single("image"), blogController.createBlog);

// GET /api/blogs/:id
router.get("/blogs/:id", blogController.getBlogById);

// PUT /api/blogs/:id
router.put("/blogs/:id", blogController.updateBlogById);

// DELETE /api/blogs/:id
router.delete("/blogs/:id", blogController.deleteBlogById);

module.exports = router;
