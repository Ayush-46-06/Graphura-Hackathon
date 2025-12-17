import User from "../model/User.model.js";
import Certificate from "../model/Certificate.model.js";
import Hackathon from "../model/Hackathon.model.js";
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
  const user = await User.findById(req.user._id)
    .populate("hackathons.hackathon");

  res.json({
    success: true,
    data: user.hackathons
  });
};

export const downloadCertificate = async (req, res) => {
  const certificate = await Certificate.findOne({
    user: req.user._id,
    hackathon: req.params.hackathonId
  });

  if (!certificate) {
    return res.status(404).json({
      success: false,
      message: "Certificate not found"
    });
  }

  res.json({
    success: true,
    certificateUrl: certificate.certificateUrl
  });
};
