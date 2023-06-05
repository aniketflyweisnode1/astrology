const AstroPost = require("../../Model/AstroModel/astroPostModel");
const asyncHandler = require("express-async-handler");

const createAstroPost = asyncHandler(async (req, res) => {
  try {
    const { title, userID } = req.body;

    // Create a new astro post
    const newPost = new AstroPost({
      title,
      userID,
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
    const post = await AstroPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ post: "Updated posts successfully." });
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


const likeThePost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;
    // Find the post which you want to be liked
    const post = await Blog.findById(postId);
    // find the  user
    const UserId = req?.user?._id;
    // find if the user has liked the post
    const isDisLiked = post?.isDisliked;
    // find if the user has disliked the post
    const alreadyLiked = post?.likes?.find(
      (userId) => userId?.toString() === UserId?.toString()
    );
    if (alreadyLiked) {
      const post = await Blog.findByIdAndUpdate(
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
      const post = await Blog.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: UserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      const post = await Blog.findByIdAndUpdate(
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


/////////////////////////////////////////////////////////=====> SHARE POST

const shareThePost = asyncHandler(async (req, res) => {
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
    if (post.author.toString() !== senderUserId) {
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

module.exports = {
  createAstroPost,
  getAllPost,
  updatePost,
  deletePost,
  getPost,
  likeThePost,
  shareThePost,
};
