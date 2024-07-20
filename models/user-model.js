const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true,  unique: true},
  email: { type: String},
  mobile: { type: String },
  role: { type: String },
  cover_url: { type: String },
  profile_pic: { type: String },
  
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPETED', 'BANNED'], default: 'PENDING'},

});

const User = mongoose.model("User", userSchema);
module.exports = User;
