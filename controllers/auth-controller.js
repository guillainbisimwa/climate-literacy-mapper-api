const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      role,
      cover_url,
      profile_pic,
    } = req.body;

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile already used!" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      cover_url,
      profile_pic,
    });

    await newUser.save();
    return res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
