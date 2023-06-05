const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', true);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = { dbConnect };