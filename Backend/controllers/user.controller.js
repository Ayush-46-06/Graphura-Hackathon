import User from "../models/User.model.js";
import Certificate from "../models/Certificate.model.js";
import path from "path"
import Registration from "../models/Registration.model.js";
import fs from "fs";
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true , runValidators:true}
  ).select("-password");

  res.json({
    success: true,
    data: user
  });
};



export const myHackathons = async (req, res) => {
  const registrations = await Registration.find({
    user: req.user._id
  }).populate("hackathon");

  res.json({
    success: true,
    data: registrations
  });
};


export const downloadCertificate = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const userId = req.user._id;

    const certificate = await Certificate.findOne({
      user: userId,
      hackathon: hackathonId
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    // 👉 redirect to cloudinary
    return res.redirect(certificate.certificateUrl);

  } catch (error) {
    console.error("DOWNLOAD CERTIFICATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate"
    });
  }
};


