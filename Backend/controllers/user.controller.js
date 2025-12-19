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
  const { hackathonId } = req.params;
  const userId = req.user._id.toString();
  
  console.log(`Attempting to download certificate for user ${userId}, hackathon ${hackathonId}`);
  
  try {
    const certificate = await Certificate.findOne({ 
      user: userId, 
      hackathon: hackathonId 
    });
    
    console.log('Certificate found:', certificate);
    
    if (!certificate) {
      return res.status(404).json({ 
        success: false, 
        message: "Certificate not found" 
      });
    }
    
    const filePath = path.join(
      process.cwd(), 
      "uploads", 
      "certificates", 
      hackathonId, 
      `${userId}.pdf`
    );
    
    console.log('Looking for file at:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        success: false, 
        message: "Certificate file not found on server" 
      });
    }
    
    res.download(filePath, `${certificate.user}.pdf`);
  } catch (err) {
    console.error('Error in downloadCertificate:', err);
    res.status(500).json({ 
      success: false, 
      message: "Error downloading certificate",
      error: err.message 
    });
  }
};

