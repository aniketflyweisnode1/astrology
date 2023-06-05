const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);
require("dotenv").config();

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("database connected")
  } catch (error) {
    console.log("database connected")
  }

}

module.exports = { dbConnect }