const Tribe = require("../models/tribe-model");

exports.findAll = async (req, res) => {
  try {
    const tribes = await Tribe.find()
      .populate({
        path: "owner",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "proof_link.vote",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "proof_link.owner",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "images.vote",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "images.owner",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "belongs",
        select: "name email mobile role status cover_url profile_pic",
      })
      .populate({
        path: "climate_change_in_language.translate.owner",
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
    const tribe = await Tribe.findOne({ _id: req.params.id }).populate({
      path: "owner",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "proof_link.vote",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "proof_link.owner",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "images.vote",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "images.owner",
      select: "name email mobile role status cover_url profile_pic",
    }).populate({
      path: "belongs",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "climate_change_in_language.translate.owner",
      select: "name email mobile role status cover_url profile_pic",
    });

    return res.status(200).json(tribe);
  } catch (error) {
    return res.status(404).json({ "Tribe not found!: ": error });
  }
};

exports.findOneByName = async (req, res) => {
  try {
    console.log("tribe", req.params.tribe);
    // const tribe = await Tribe.findOne({ tribe: req.params.tribe });
    const tribe = await Tribe.findOne({ tribe: new RegExp(`^${req.params.tribe}$`, 'i') });

    console.log(tribe);
    if (!tribe) {
      return res.status(404).json({ message: "Tribe not found!" });
    }
    return res.status(200).json(tribe);
  } catch (error) {
    console.error("Error fetching tribe:", error); // Log the error to the console
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Express route handler
exports.findTribeByBelongsId = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Find a tribe where the belongs array includes the given ID
    const tribe = await Tribe.findOne({ belongs: id });

    if (!tribe) {
      return res.status(404).json({ message: 'Tribe not found' });
    }

    return res.status(200).json(tribe);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * This function, Create A tribe with an initial TimeLine message
 *
 * @param {*} req
 * @param {*} res
 * @returns  { message: String , tribe: Array }
 */

exports.create = async (req, res) => {
  const newTribe = new Tribe(req.body);
  try {
    const savedTribe = await newTribe.save();
    return res
      .status(201)
      .json({ message: "Tribe saved successfully", tribe: savedTribe });
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
      tribe: updatedTribe,
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
      tribe: deletedTribe,
    });
  } catch (error) {
    return res.status(500).json({ error: "Tribe not deleted!", details: error });
  }
};



exports.patchTribe = async (req, res) => {
  try {
    const { tribeId } = req.params;

    if (!tribeId) {
      return res.status(400).json({ message: "Tribe ID is required." });
    }

    // Initialize an object to hold the updates
    const updates = { ...req.body };

    // Update the user with the new data
    const updatedTribe = await Tribe.findByIdAndUpdate(
      tribeId,
      updates,
      { new: true, runValidators: true }
    ).populate({
      path: "owner",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "proof_link.vote",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "proof_link.owner",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "images.vote",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "images.owner",
      select: "name email mobile role status cover_url profile_pic",
    }).populate({
      path: "belongs",
      select: "name email mobile role status cover_url profile_pic",
    })
    .populate({
      path: "climate_change_in_language.translate.owner",
      select: "name email mobile role status cover_url profile_pic",
    });

    if (!updatedTribe) {
      return res.status(404).json({ message: "Tribe not found." });
    }

    res.status(200).json({ message: "Tribe updated successfully!", tribe: updatedTribe });
  } catch (error) {
    res.status(400).json({ message: "Failed to update tribe:", error: error.message });
  }
};
