const mongoose = require("mongoose");
const ourBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    blogImage: {
      type: Object,
      default: {},
    },
    imageLink: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", ourBlogSchema);
