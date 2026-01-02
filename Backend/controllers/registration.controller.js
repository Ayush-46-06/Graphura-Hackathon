import Registration from "../models/Registration.model.js";
import Hackathon from "../models/Hackathon.model.js";

export const registerForHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.body;
    const userId = req.user._id;


    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    if (hackathon.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Registrations are closed for this hackathon"
      });
    }

    const exists = await Registration.findOne({
      user: userId,
      hackathon: hackathonId
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already registered"
      });
    }


    await Registration.create({
      user: userId,
      hackathon: hackathonId
    });


    await Hackathon.findByIdAndUpdate(
      hackathonId,
      { $addToSet: { participants: userId } }
    );

    res.status(201).json({
      success: true,
      message: "Registered successfully"
    });

  } catch (error) {
    console.error("REGISTER HACKATHON ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register for hackathon"
    });
  }
};



export const getParticipantsCount = async (req, res) => {
  const { hackathonId } = req.params;

  const count = await Registration.countDocuments({
    hackathon: hackathonId
  });

  res.json({
    success: true,
    data: { count }
  });
};

export const getParticipantsList = async (req, res) => {
  const { hackathonId } = req.params;

  const participants = await Registration.find({
    hackathon: hackathonId
  }).populate("user", "name email university").populate("hackathon", "title");

  res.json({
    success: true,
    data: participants
  });
};