import User from "../model/User.model.js";
import Hackathon from "../model/Hackathon.model.js";
import Certificate from "../model/Certificate.model.js";
import googleSheetService from "../services/googleSheet.service.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
};

export const declareHackathonResult = async (req, res) => {
  const { hackathonId, winners } = req.body;

  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    return res.status(404).json({
      success: false,
      message: "Hackathon not found"
    });
  }

  hackathon.winners = winners;
  hackathon.status = "completed";
  await hackathon.save();

  await Certificate.insertMany(
    winners.map(userId => ({
      user: userId,
      hackathon: hackathonId,
      certificateUrl: `https://certs.com/${hackathonId}/${userId}`
    }))
  );

  res.json({
    success: true,
    message: "Results declared successfully"
  });
};

export const exportStudentsToSheet = async (req, res) => {
  const users = await User.find().select("name email university");
  await googleSheetService.exportUsers(users);

  res.json({
    success: true,
    message: "Students exported to Google Sheet",
  });
};
