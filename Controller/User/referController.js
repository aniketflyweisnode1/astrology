const User = require("../../Model/UserModel/User");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const Wallet = require("../../Model/UserModel/wallet");

// const { findById } = require("../models/User");

// exports.generateRefer = catchAsync(async (req, res) => {
//   const user = await User.findById(req.body.user);

//   const refer = user.name + 123;
//   user.ReferCode = refer;
//   await user.save();

//   res.status(200).json({
//     status: "success",
//     data: user,
//   });
// });

exports.getReferral = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }


  res.status(200).json({
    status: "success",
    referalCode: user.referCode,
  });
});

exports.useReferCode = catchAsync(async (req, res, next) => {
  console.log(req.body.user);
  const user = await User.findById({ _id: req.body.user });
  console.log(user)
  const user2 = await User.findOne({ referCode: req.body.code });

  if (!user2) {
    return next(new AppError("Invalid Refer Code!", 404));
  }

  if (user.referStatus === "used") {
    return next(new AppError("User has already used Referal Code!", 400));
  }

  // Adding money to new user
  user.referStatus = "used";
  const wallet = await Wallet.findOne({ user: req.body.user });
  console.log(wallet)
  wallet.balance = wallet.balance + 30;
  const n = await wallet.save();

  // // Adding money to Old User
  // const wallet2 = await Wallet.findOne({ user: user2._id });
  // wallet2.balance = wallet2.balance + 30;
  // await wallet2.save();

  res.status(200).json({
    status: "success",
    message: `used referal code of ${user.firstname}`,
    data: n,
  });
});
