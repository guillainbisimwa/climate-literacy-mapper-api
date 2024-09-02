const mongoose = require("mongoose");

const translate_ = mongoose.Schema({
  value: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now() },
  vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
});

const tribeSchema = new mongoose.Schema({
  climate_know_exist: { type: Boolean, required: true },
  tribe: { type: String }, // name
  belongs: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  // What is climate change in your native language
  climate_change_in_language: {
    translate: { type: [translate_], default: [] },
    status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      // required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      // required: true
    }
  },
  proof_link: [{
    name: String,
    link: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
  }],
  images: [{
    type: [String], 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
  }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
});

const Tribe = mongoose.model("Tribe", tribeSchema);
module.exports = Tribe;
