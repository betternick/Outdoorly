const crypto = require("crypto");

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

const jwtSecret = generateRandomString(32); // Generate a 32-character random string
console.log("JWT Secret:", jwtSecret);
