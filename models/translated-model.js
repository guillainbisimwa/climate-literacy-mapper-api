const mongoose = require("mongoose");

const tribeSchema = mongoose.Schema({
  // Climate change 
  // Pre-lesson questions 8
  preLesson: [
    {
      fr: String,
      eng: String,
      local: String
    }
  ],

  // Local challenges
  localChallenges: [
    {
      fr: String,
      eng: String,
      local: String
    }
  ],
  // Mindfulness exercises
  mindfullExercises: [
    {
      fr: String,
      eng: String,
      local: String
    }
  ],
  // Real-life exis􏰀ng examples 
  // Case studies
  // Problem-solving scenarios
  // Mindfulness exercises (pick one) 
  
  // Agroforestry
  // Pre-lesson ques􏰀ons 
  // Local solu􏰀ons 
  // Mindfulness exercises 
  // Real-life exis􏰀ng examples 
  // Case studies
  // Problem-solving scenarios
  // 12 Mindfulness exercises 

 
  tribe: { type: mongoose.Schema.Types.ObjectId, ref: "Tribe" },
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, enum: ['PENDING', 'REJECTED', 'ACCEPETED', 'BANNED'], default: 'PENDING'},

});

const Tribe = mongoose.model("Tribe", tribeSchema);
module.exports = Tribe;
