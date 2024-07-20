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


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // compare the two passwords
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid Password!" });
    }

    // generate token
    const secretKey = process.env.SECRET_KEY;
    const userData = {
      userId: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      mobile: foundUser.mobile,
      username: foundUser.username,
      profile_pic: foundUser.profile_pic,
    };
    const token = jwt.sign(userData, secretKey, { expiresIn: "24h" });

    return await res.status(200).json({
      msg: "Login successful",
      user: {
        token,
        user: userData,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginByPhone = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const foundUser = await User.findOne({ mobile });
    if (!foundUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // compare the two passwords
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid Password!" });
    }

    // generate token
    const secretKey = process.env.SECRET_KEY;
    const userData = {
      userId: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      mobile: foundUser.mobile,
      username: foundUser.username,
      profile_pic: foundUser.profile_pic,
    };
    const token = jwt.sign(userData, secretKey, { expiresIn: "24h" });

    return await res.status(200).json({
      msg: "Login successful",
      user: {
        token,
        user: userData,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.findAll = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    console.log("User", user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ "error: ": error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ "User not found!: ": error });
  }
};

exports.findByMobile = async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobile });
    if (!user) {
      return res.status(200).json({ msg: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ "User not found!: ": error });
  }
};
