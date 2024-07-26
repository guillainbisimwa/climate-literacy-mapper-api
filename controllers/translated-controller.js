const Translated = require("../models/translated-model");

exports.findAll = async (req, res) => {
  try {
    const tribes = await Translated.find()
      .populate({
        path: "tribe",
        select: "tribe language climate_change_in_lang location proof_link images owner timestamp status",
      });

    console.log("tribes", tribes);
    return res.status(200).json(tribes);
  } catch (error) {
    return res.status(400).json({ "error: ": error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const translation = await Translated.findOne({ _id: req.params.id });
    return res.status(200).json(translation);
  } catch (error) {
    return res.status(404).json({ "Translation not found!: ": error });
  }
};

/**
 * This function, Create A translation with an initial TimeLine message
 *
 * @param {*} req
 * @param {*} res
 * @returns  { message: String , translation: Array }
 */

exports.create = async (req, res) => {
  const newTranslated = new Translated(req.body);
  try {
    const savedTranslated = await newTranslated.save();
    return res
      .status(201)
      .json({ message: "Translation saved successfully", translation: savedTranslated });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Translation not saved!", details: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const foundTranslated = await Translated.findOne({ _id: req.params.id });
    if (!foundTranslated) {
      return res.status(404).json({ error: "Translation not found!" });
    }
    const updatedTranslated = await Translated.updateOne(
      { _id: foundTranslated._id },
      { ...req.body },
      { new: true }
    );
    return res.json({
      message: "Translation updated successfully",
      translation: updatedTranslated,
    });
  } catch (error) {
    return res.status(400).json({ error: "Translation not updated!", details: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const foundTranslated = await Translated.findOne({ _id: req.params.id });
    if (!foundTranslated) {
      return res.status(404).json({ error: "Translation not found!" });
    }
    const deletedTranslated = await Translated.deleteOne({ _id: foundTranslated._id });
    return res.json({
      message: "Translation deleted successfully",
      translation: deletedTranslated,
    });
  } catch (error) {
    return res.status(500).json({ error: "Translation not deleted!", details: error });
  }
};
