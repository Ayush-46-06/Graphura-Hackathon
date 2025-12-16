import Registration from "../model/Registration.model.js";

export const registerForHackathon = async (req, res) => {
  const { hackathonId } = req.body;

  const exists = await Registration.findOne({
    user: req.user._id,
    hackathon: hackathonId
  });

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Already registered"
    });
  }

  await Registration.create({
    user: req.user._id,
    hackathon: hackathonId
  });

  res.status(201).json({
    success: true,
    message: "Registered successfully"
  });
};
