import Hackathon from "../models/Hackathon.model.js";

export const createHackathon = async (req, res) => {
  const hackathon = await Hackathon.create(req.body);
  res.status(201).json({ success: true, data: hackathon });
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
  const hackathons = await Hackathon.find();
  res.json({ success: true, data: hackathons });
};

export const getHackathonById = async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);
  res.json({ success: true, data: hackathon });
};
