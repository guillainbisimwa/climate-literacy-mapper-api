const Tribe = require("../models/tribe-model");

exports.findAll = async (req, res) => {
  try {
    const tribes = await Tribe.find()
      .populate({
        path: "owner",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "membres.user",
        select: "name email mobile role status cover_url profile_pic",
      });

    console.log("tribes", tribes);
    return res.status(200).json(tribes);
  } catch (error) {
    return res.status(400).json({ "error: ": error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const avec = await Tribe.findOne({ _id: req.params.id });
    return res.status(200).json(avec);
  } catch (error) {
    return res.status(404).json({ "Tribe not found!: ": error });
  }
};

/**
 * This function, Create A avec with an initial TimeLine message
 *
 * @param {*} req
 * @param {*} res
 * @returns  { message: String , avec: Array }
 */
