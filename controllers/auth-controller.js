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
      address,
      city,
      country,
      isVerified
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
      address,
      city,
      country,
      isVerified
    });

    await newUser.save();
    return res.status(201).json({ user: newUser, msg: "User created successfully!" });
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
      address: foundUser.address,
      city: foundUser.city,
      country: foundUser.country,
      isVerified: foundUser.isVerified
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
      address: foundUser.address,
      city: foundUser.city,
      country: foundUser.country,
      isVerified: foundUser.isVerified
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


exports.editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, mobile, role, cover_url, profile_pic } =
      req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.role = role || user.role;
    user.cover_url = cover_url || user.cover_url;
    user.profile_pic = profile_pic || user.profile_pic;
    user.address =  address || user.address,
    user.city =  city || user.city,
    user.country =  country || user.country,
    user.isVerified =  is || user.isVerified

    // Save the updated user
    await user.save();

    return res.status(200).json({ msg: "User updated successfully!", user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.forgotDetails = async (req, res, next) => {};


exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Find the user by id
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    // check password
    const passwordMatch = await bcrypt.compare(oldPassword, foundUser.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Password Incorrect, Please try again!" });
    }

    // encrypting new password
    const saltRounds = 10;
    const hashedPssword = await bcrypt.hash(newPassword, saltRounds);

    await User.findOneAndUpdate({ _id: id }, { password: hashedPssword });
    return res.status(200).json({ msg: "Password updated successfully!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Find the user by id
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    // encrypting new password
    const saltRounds = 10;
    const hashedPssword = await bcrypt.hash(password, saltRounds);

    await User.findOneAndUpdate({ _id: id }, { password: hashedPssword });
    return res.status(200).json({ msg: "Password updated successfully!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

exports.patchUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Failed to update user.", error: error.message });
  }
};
