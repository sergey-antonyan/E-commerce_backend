const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const { generateAccessToken } = require("../middleware/jwt_generate");
const nodemailer = require("nodemailer");
const MAIL = process.env.MAIL;
const PASS = process.env.PASS;
const SECRET = process.env.SECRET;
const { regSchema, logSchema } = require("../validations/validation_schema");

exports.register = (req, res) => {
  const { userName, firstName, lastName, Email, password, is_verified } =
    req.body;
  const { error } = regSchema.validate(req.body);
  console.log(Email)
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(Email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  Users.findOne({ where: { Email: Email } }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashed_password = CryptoJS.SHA256(password).toString();
    Users.create({
      userName,
      firstName,
      lastName,
      Email,
      password: hashed_password,
      is_verified,
    })
      .then((data) => {
        let token = generateAccessToken(Email, is_verified);
        send_mail(Email, token);
        res.status(201).json({ message: "User created" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
};

exports.login = (req, res) => {
  const { Email, password } = req.body;
  const { error } = logSchema.validate(req.body);
  console.log(Email);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const hashed_password = CryptoJS.SHA256(password).toString();
  Users.findOne({ where: { Email: Email } }).then((data) => {
    console.log(data.password, hashed_password);
    if (data && data.password === hashed_password && data.is_verified == 1) {
      let token = generateAccessToken(Email, data.role);
      res.send(
        JSON.stringify({
          status: "Logged in",
          userName: data.userName,
          jwt: token,
          role: data.role,
          is_verified: data.is_verified,
        })
      );
    } else {
      res.send(JSON.stringify({ status: "Not logged in" }));
    }
  });
};

exports.getAllUsers = (req, res) => {
  Users.findAll()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(500).send({ err: err.message || "There was an error " })
    );
};

send_mail = (mail, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: MAIL,
      pass: PASS,
    },
  });

  const mailOptions = {
    from: MAIL,
    to: mail,
    subject: "Sending Email using Node.js",
    text: ` sexmel http://localhost:5000/verify/${token}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent :" + info.response);
    }
  });
};

exports.verified = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, SECRET);
    const { is_Verified } = req.body;
    await Users.update({ is_verified: 1 }, { where: { Email: decoded.Email } });
    res.status(200).json({ message: "Verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params;
    const data = await Users.destroy({ where: id });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
