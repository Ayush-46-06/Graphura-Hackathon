import Registration from "../models/Registration.model.js";
import Hackathon from "../models/Hackathon.model.js";
import {sendHackathonRegistrationMail} from "../services/mail.service.js"
export const registerForHackathon = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "Only users can register for hackathons"
      });
    }

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

    // ✅ SEND MAIL (non-blocking recommended)
    sendHackathonRegistrationMail({
      userName: req.user.name,
      userEmail: req.user.email,
      hackathonTitle: hackathon.title,
      startDate: hackathon.startDate,
      endDate: hackathon.endDate
    }).catch(err => {
      console.error("MAIL ERROR:", err);
    });

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
  try {
    const { hackathonId } = req.params;

    const count = await Registration.countDocuments({
      hackathon: hackathonId
    });

    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch participants count",
      error: error.message
    });
  }
};


export const getParticipantsList = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const hackathon = await Hackathon
      .findById(hackathonId)
      .select("title");

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    const participants = await Registration.find({
      hackathon: hackathonId
    })
      .populate("user", "name email university");

    res.status(200).json({
      success: true,
      data: {
        hackathon,
        participants, // [] if none
        count: participants.length
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch participants",
      error: error.message
    });
  }
};
