const mongoose = require("mongoose");

const refSchema = mongoose.Schema({
  climate_know_exist: {type: Boolean, required: true },
  tribe: { type: String},
  language: { type: String},
  // What is climate change in your native language
  climate_change_in_lang: {type: String},

  location: {
    type: "Point",
    coordinates: [Number, Number]
  },
  proof_link:[{ 
    name: String,
    link: String,
  }],
  images: { type: [String]},

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPETED', 'BANNED'], default: 'PENDING'},

});

const Ref = mongoose.model("Ref", refSchema);
module.exports = Ref;
