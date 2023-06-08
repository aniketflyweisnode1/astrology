const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), tokenKey);
    req.user = decoded.id;
    console.log("user", req.user);
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;