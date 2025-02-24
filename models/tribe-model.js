const mongoose = require("mongoose");

const translate_ = mongoose.Schema({
  value: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now() },
  vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  status: { type: String, enum: ['PENDING', 'ACTIVE', 'BANNED'], default: 'PENDING' },
});

const tribeSchema = new mongoose.Schema({
  climate_know_exist: { type: Boolean, required: true },
  tribe: { type: String }, // name
  belongs: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  // What is climate change in your native language
  climate_change_in_language: {
    translate: { type: [translate_], default: [] },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'BANNED'], default: 'PENDING' },
  },

  location: [{
    radius: Number,
    coordinates: {
      type: [Number],
    },
    name: String,
    link: String,
    country: String,
  }],
  proof_link: [{
    name: String,
    link: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'BANNED'], default: 'PENDING' },
  }],
  images: [{
    image: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'BANNED'], default: 'PENDING' },
  }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'ACTIVE', 'BANNED'], default: 'PENDING' },
});

const Tribe = mongoose.model("Tribe", tribeSchema);
module.exports = Tribe;
