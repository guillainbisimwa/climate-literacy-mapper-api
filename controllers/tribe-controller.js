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

exports.create = async (req, res) => {
  const newTribe = new Tribe(req.body);
  try {
    const savedTribe = await newTribe.save();
    return res
      .status(201)
      .json({ message: "Tribe saved successfully", avec: savedTribe });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Tribe not saved!", details: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const foundTribe = await Tribe.findOne({ _id: req.params.id });
    if (!foundTribe) {
      return res.status(404).json({ error: "Tribe not found!" });
    }
    const updatedTribe = await Tribe.updateOne(
      { _id: foundTribe._id },
      { ...req.body },
      { new: true }
    );
    return res.json({
      message: "Tribe updated successfully",
      avec: updatedTribe,
    });
  } catch (error) {
    return res.status(400).json({ error: "Tribe not updated!", details: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const foundTribe = await Tribe.findOne({ _id: req.params.id });
    if (!foundTribe) {
      return res.status(404).json({ error: "Tribe not found!" });
    }
    const deletedTribe = await Tribe.deleteOne({ _id: foundTribe._id });
    return res.json({
      message: "Tribe deleted successfully",
      avec: deletedTribe,
    });
  } catch (error) {
    return res.status(500).json({ error: "Tribe not deleted!", details: error });
  }
};
