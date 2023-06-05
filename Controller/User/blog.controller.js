const Blog = require("../../Model/UserModel/blog");

// GET /api/blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().lean();
        res.status(200).json({ data: blogs });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// POST /api/blogs
exports.createBlog = async (req, res) => {
    // req.body.blogImage = { url: req.file.location, key: req.file.key };
    try {
        // console.log(req.body);
        const newBlog = new Blog(req.body);

        await newBlog.save();

        res.status(201).json({
            data: newBlog,
            message: "Blog created successfully",
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// GET /api/blogs/:id
exports.getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        res.status(200).json({ data: blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// PUT /api/blogs/:id
exports.updateBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        let blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({
            message: "blog Updated Successfully",
            data: blog,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE /api/blogs/:id
exports.deleteBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        let blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};
