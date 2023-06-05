const profile = require("../../Model/AstroModel/myProfileModel");
const Post = require("../../Model/AstroModel/astroPostModel");
const asyncHandler = require("express-async-handler");


const Profile = asyncHandler(async (req, res) => {
  const { username, specialty } = req.body;
  try {
    const profile = new Profile({
      username,
      specialty,
    });

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


/////////////////////////////////////////////// GET PROFILE //////////////////////

const getProfile = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find().populate('followers following posts');
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


/////////////////////////////////////////////// GET SINGEL PROFILE //////////////////////

const getSingleProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  try {
    const profile = await Profile.findById(profileId).populate('followers following posts');

    if (!profile) {
      return res.status(404).json({ error: 'Profilenot found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/////////////////////////////////////////////// Add a follower to a profile //////////////////////////////////////////////////////////////////
const AddFollower = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const { followerId } = req.body;

  try {
    const profile = await Profile.findById(profileId);
    const follower = await Profile.findById(followerId);
    if (!profile || !follower) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    profile.followers.push(follower);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/////////////////////////////////////////////// Create a new post for a profile //////////////////////////////////////////////////////////////////

const CreatePostProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const { title, content } = req.body;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const post = new Post({
      title,
      content,
      author: profile,
    });

    await post.save();

    profile.posts.push(post);
    await profile.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = {
  Profile,
  getProfile,
  getSingleProfile,
  AddFollower,
  CreatePostProfile
}


