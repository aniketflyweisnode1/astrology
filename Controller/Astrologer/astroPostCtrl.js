const AstroPost = require("../../Model/AstroModel/astroPostModel");
const Blog = require("../../Model/UserModel/blog");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");


const createAstroPost = asyncHandler(async (req, res) => {
  try {
    const { title, userID } = req.body;

    if (!req.file) {
      return res.status(400).json({ status: 400, error: "Image file is required" });
    }

    // Create a new astro post
    const newPost = new AstroPost({
      title,
      userID,
      image: req.file.path,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

//////////////////////////////////////////////////////////////// ==> GET ALL POST

const getAllPost = asyncHandler(async (req, res) => {
  try {
    const posts = await AstroPost.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get posts." });
  }
});

//////////////////////////////////////////////////////////////// ==> GET SINGLE POST

// const getSinglePost = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await AstroPost.findById(id);
//     res.status(200).json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to get Single post." });
//   }
// });

//////////////////////////////////////////////////////////////// ==> UPDATE POST

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    if (!req.file) {
      return res.status(400).json({ status: 400, error: "Image file is required" });
    }

    const updatedFields = {
      ...req.body,
      image: req.file.path,
    };

    const post = await AstroPost.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.status(200).json({ post: "Updated posts successfully.", data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in updated Post!" });
  }
});

//////////////////////////////////////////////////////////////// ==> DELETE POST

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await AstroPost.findByIdAndDelete(id, {
      new: true,
    });
    res.status(200).json({ post: "Deleted posts successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong in Deleted Post!" });
  }
});

//////////////////////////////////////////////////////////////// ==> MY POST GET BY USERNAME

const getPost = asyncHandler(async (req, res) => {
  const { id, userId } = req.params;

  try {
    let post;

    if (id) {
      post = await AstroPost.findById(id);
    } else if (userId) {
      post = await AstroPost.find({ userId });
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get post" });
  }
});

//////////////////////////////////////////////////////////////// ==> LIKE THE POST

// const likeThePost = asyncHandler(async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { userId } = req.body;

//     // Find the post by ID
//     const post = await AstroPost.findById(postId);
//     console.log(post);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // Check if the user has already liked the post
//     if (post.likes.user.includes(userId)) {
//       return res.status(400).json({ error: "Post already liked" });
//     }
//     // if (post.dislikes.includes(userId)) {
//     //   post.dislikes.pull(userId);
//     // }
//  // Update the likes count

//     // Add the user's ID to the post's likes array
//     post.likes.user.push(userId);
//     // post.likes.count += 1;

//     // Save the updated post
//     const updatedPost = await post.save();

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to like the post" });
//   }
// });


const likeThePost1 = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;
    // Find the post which you want to be liked
    const post = await AstroPost.findById(postId);
    // find the  user
    const UserId = req?.user;
    // find if the user has liked the post
    const isDisLiked = post?.isDisliked;
    // find if the user has disliked the post
    const alreadyLiked = post?.likes?.find(
      (userId) => userId?.toString() === UserId?.toString()
    );
    if (alreadyLiked) {
      const post = await AstroPost.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: UserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(post);
    }
    if (isDisLiked) {
      const post = await AstroPost.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: UserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      const post = await AstroPost.findByIdAndUpdate(
        postId,
        {
          $push: { dislikes: UserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like the post" });
  }
});


const likeThePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await AstroPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userId = req.user;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      post.totalLike -= 1;
      post.isLiked = false;
    } else {
      post.likes.push(userId);
      post.totalLike += 1;
      post.isLiked = true;
    }
    post.totalViews += 1;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like the post' });
  }
};




const getUsersWhoLikedPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await AstroPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post
      .populate('likes', 'firstName email mobile')

    const likedUsers = post.likes;

    return res.status(200).json({status: 200, data: likedUsers});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get liked users for the post' });
  }
};








/////////////////////////////////////////////////////////=====> SHARE POST






const shareThePost1 = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const { senderUserId, receiverUserIds } = req.body;

    // Find the post by ID
    const post = await AstroPost.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the sender has the permission to share the post
    if (post.userID.toString() !== senderUserId) {
      return res.status(403).json({ error: "You don't have permission to share this post" });
    }

    // Share the post with each receiver user
    for (const receiverUserId of receiverUserIds) {
      // Check if the user has already received the post
      if (post.sharedWith.includes(receiverUserId)) {
        continue; // Skip sharing if the user already received the post
      }

      // Add the user's ID to the post's sharedWith array
      post.sharedWith.push(receiverUserId);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share the post" });
  }
});

const shareThePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const senderUserId = req.user;
    let { receiverUserIds } = req.body;

    if (!Array.isArray(receiverUserIds)) {
      receiverUserIds = [receiverUserIds];
    }

    const post = await AstroPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userID.toString() !== senderUserId) {
      return res.status(403).json({ error: "You don't have permission to share this post" });
    }

    for (const receiverUserId of receiverUserIds) {
      if (post.sharedWith.includes(receiverUserId)) {
        continue;
      }

      post.sharedWith.push(receiverUserId);
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share the post" });
  }
});




const addCommentToPost = asyncHandler(async (req, res) => {
  try {
    const { postId, text } = req.body;
    const UserId = req.user;

    const post = await AstroPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      user: UserId,
      text,
    };

    post.comments.push(newComment);

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add a comment" });
  }
});



module.exports = {
  createAstroPost,
  getAllPost,
  updatePost,
  deletePost,
  getPost,
  likeThePost,
  // dislikeThePost,
  shareThePost,
  addCommentToPost,
  getUsersWhoLikedPost
};
