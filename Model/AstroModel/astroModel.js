// const { default: mongoose } = require("mongoose");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema(
//   {
//     fullname: {
//       type: String,
//     },
//     email: {
//       type: String,
//       unique: true,
//     },
//     mobile: {
//       type: String,
//     },
//     password: {
//       type: String,
//     },
//     confirm: {
//       type: String,
//     },
//     highestQualification: {
//       type: String,
//     },
//     collegeInstitute: {
//       type: String,
//     },
//     passingYear: {
//       type: Number,
//     },
//     specialization: {
//       type: String,
//     },
//     typeOfPractice: {
//       type: String,
//     },
//     totalExperience: {
//       type: Number,
//     },
//     uploadDocument: {
//       type: String,
//     },
//     skills: {
//       type: [String],
//       default: [],
//     },
//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // PASSWORD - HASH
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSaltSync(10);
//   this.password = await bcrypt.hashSync(this.password, salt);
//   next();
// });

// //MATCH HASH PASSWORD
// userSchema.methods.isPasswordValid = async function (enteredPassword) {
//   try {
//     return await bcrypt.compare(enteredPassword, this.password);
//   } catch (error) {
//     throw error;
//   }
// };

// userSchema.methods.createPasswordResetToken = async function () {
//   const resettoken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resettoken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//   return resettoken;
// };

// module.exports = mongoose.model("astro", userSchema);
