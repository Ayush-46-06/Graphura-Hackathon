import Registration from "../models/Registration.model.js";
import Hackathon from "../models/Hackathon.model.js";

export const registerForHackathon = async (req, res) => {
  const { hackathonId } = req.body;
  const userId = req.user._id;


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
  }).populate("user", "name email university");

  res.json({
    success: true,
    data: participants
  });
};