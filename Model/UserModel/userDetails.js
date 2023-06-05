const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    User_Name: { type: String },

    Experince: { type: String },

    Skills: [{ type: String }],

    AboutMe: { type: String },

    User_Images: [{ type: String }],

    Languages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetail", UserDetailSchema);
