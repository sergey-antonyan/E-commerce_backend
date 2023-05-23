const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

function generateAccessToken(Email, role) {
  return jwt.sign({ Email, role }, SECRET, { expiresIn: "36000s" });
}

module.exports = { generateAccessToken };
