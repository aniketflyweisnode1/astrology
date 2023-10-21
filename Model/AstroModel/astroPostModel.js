const mongoose = require("mongoose");

const asrtroPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "https://youtu.be/r6SbfF9FjTg",
    },
    des: {
      type: String,
      default: "",
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalLike: {
      type: Number,
      default: 0,
    },
    // totalDislike: {
    //   type: Number,
    //   default: 0,
    // },
    isLiked: {
      type: Boolean,
      default: false,
    },
    // isDisliked: {
    //   type: Boolean,
    //   default: false,
    // },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // dislikes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", asrtroPostSchema);
