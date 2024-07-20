const Ref = require("../models/ref-model");

exports.findAll = async (req, res) => {
  try {
    const refs = await Ref.find()
      .populate({
        path: "owner",
        select: "name email mobile role status cover_url profile_pic",
      });

    console.log("refs", refs);
    return res.status(200).json(refs);
  } catch (error) {
    return res.status(400).json({ "error: ": error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const avec = await Ref.findOne({ _id: req.params.id });
    return res.status(200).json(avec);
  } catch (error) {
    return res.status(404).json({ "Ref not found!: ": error });
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
  const newRef = new Ref(req.body);
  try {
    const savedRef = await newRef.save();
    return res
      .status(201)
      .json({ message: "Ref saved successfully", avec: savedRef });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Ref not saved!", details: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const foundRef = await Ref.findOne({ _id: req.params.id });
    if (!foundRef) {
      return res.status(404).json({ error: "Ref not found!" });
    }
    const updatedRef = await Ref.updateOne(
      { _id: foundRef._id },
      { ...req.body },
      { new: true }
    );
    return res.json({
      message: "Ref updated successfully",
      avec: updatedRef,
    });
  } catch (error) {
    return res.status(400).json({ error: "Ref not updated!", details: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const foundRef = await Ref.findOne({ _id: req.params.id });
    if (!foundRef) {
      return res.status(404).json({ error: "Ref not found!" });
    }
    const deletedRef = await Ref.deleteOne({ _id: foundRef._id });
    return res.json({
      message: "Ref deleted successfully",
      avec: deletedRef,
    });
  } catch (error) {
    return res.status(500).json({ error: "Ref not deleted!", details: error });
  }
};
