const mongoose = require("mongoose");

const tribeSchema = new mongoose.Schema({
  climate_know_exist: { type: Boolean, required: true },
  tribe: { type: String },
  language: { type: String },
  // What is climate change in your native language
  climate_change_in_lang: { type: String },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  proof_link: [{
    name: String,
    link: String
  }],
  images: { type: [String] },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPTED', 'BANNED'], default: 'PENDING' },
});

const Tribe = mongoose.model("Tribe", tribeSchema);
module.exports = Tribe;
