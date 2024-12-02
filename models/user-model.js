const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true,  unique: true},
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  address: { type: String },
  state: { type: String },
  city: { type: String },
  role: { type: String },
  isVerified: { type: Boolean, dafault: false },
  cover_url: { type: String },
  profile_pic: { type: String },
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPETED', 'BANNED', "DEACTIVATED"], default: 'PENDING'},

});

const User = mongoose.model("User", userSchema);
module.exports = User;
