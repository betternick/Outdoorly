const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

//Given info, generate JWT Token with Secret
const getJWT = (info) => {
  const token = jwt.sign(info, JWT_SECRET);
  return token;
};

// Given token, decode Token with secrete, return info
const decodeJWT = (token) => {
  const decoded = decode(token);
  return decoded;
};

module.exports = {
  getJWT: getJWT,
  decodeJWT: decodeJWT,
};