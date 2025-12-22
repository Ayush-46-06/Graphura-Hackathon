import Hackathon from "../models/Hackathon.model.js";

export const createHackathon = async (req, res) => {

  // Tags parse
  if (req.body.tags && typeof req.body.tags === "string") {
    req.body.tags = JSON.parse(req.body.tags);
  }

  // Judges parse
  if (req.body.judges && typeof req.body.judges === "string") {
    req.body.judges = JSON.parse(req.body.judges);
  }

  const hackathon = await Hackathon.create({
    ...req.body,
    image: req.file.path
  });

  res.status(201).json({
    success: true,
    data: hackathon
  });
};


export const updateHackathon = async (req, res) => {
  const hackathon = await Hackathon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ success: true, data: hackathon });
};

export const deleteHackathon = async (req, res) => {
  await Hackathon.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Hackathon deleted" });
};

export const getAllHackathons = async (req, res) => {
  const hackathons = await Hackathon.find()
    .populate("judges", "name email");

  res.json({ success: true, data: hackathons });
};

export const getHackathonById = async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id)
    .populate("judges", "name email");

  res.json({ success: true, data: hackathon });
};
