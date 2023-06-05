const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

const Profile = mongoose.model('profile', ProfileSchema);


module.exports = Profile;