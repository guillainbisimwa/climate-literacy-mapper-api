const mongoose = require("mongoose");

const refSchema = mongoose.Schema({
  email: {type: String },
  phone: { type: String},
  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPETED', 'BANNED'], default: 'PENDING'},

});

const Ref = mongoose.model("Ref", refSchema);
module.exports = Ref;
