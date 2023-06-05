const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  Phone: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Whatsapp: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Support", supportSchema);
