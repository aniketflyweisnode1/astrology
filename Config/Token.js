const jwt = require("jsonwebtoken");
require("dotenv").config();

//==================================> Token

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//==================================> RefreshToken

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = {
  generateJwtToken,
  generateRefreshToken,
};
