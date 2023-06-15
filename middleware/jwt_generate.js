const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

function generateAccessToken(Email, id,role) {
  return jwt.sign({ Email, id ,role }, SECRET, { expiresIn: "36000s" });
}

module.exports = { generateAccessToken };
