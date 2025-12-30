import mongoose from "mongoose";
import Hackathon from "../models/Hackathon.model.js";

export const createHackathon = async (req, res) => {
  try {
    if (req.body.tags && typeof req.body.tags === "string") {
      req.body.tags = JSON.parse(req.body.tags);
    }

    if (req.body.judges && typeof req.body.judges === "string") {
      req.body.judges = JSON.parse(req.body.judges);
    }

    if (Array.isArray(req.body.judges)) {
      const invalidJudge = req.body.judges.find(
        id => !mongoose.Types.ObjectId.isValid(id)
      );

      if (invalidJudge) {
        return res.status(400).json({
          success: false,
          message: "Invalid judge ID provided"
        });
      }
    }

    if (!req.files?.image || req.files.image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Hackathon banner image is required"
      });
    }

    const sponsorLogos = req.files?.sponsors
      ? req.files.sponsors.map(file => file.path)
      : [];

    const hackathon = await Hackathon.create({
      ...req.body,
      image: req.files.image[0].path,
      sponsors: sponsorLogos
    });

    res.status(201).json({
      success: true,
      data: hackathon
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create hackathon",
      error: error.message
    });
  }
};



export const updateHackathon = async (req, res) => {
  try {
    if (req.body.tags && typeof req.body.tags === "string") {
      req.body.tags = JSON.parse(req.body.tags);
    }

    if (req.body.judges && typeof req.body.judges === "string") {
      req.body.judges = JSON.parse(req.body.judges);
    }

    if (Array.isArray(req.body.judges)) {
      const invalidJudge = req.body.judges.find(
        id => !mongoose.Types.ObjectId.isValid(id)
      );

      if (invalidJudge) {
        return res.status(400).json({
          success: false,
          message: "Invalid judge ID provided"
        });
      }
    }

    if (req.files?.image?.length) {
      req.body.image = req.files.image[0].path;
    }

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    res.json({
      success: true,
      data: hackathon
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update hackathon",
      error: error.message
    });
  }
};



export const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    res.json({
      success: true,
      message: "Hackathon deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete hackathon",
      error: error.message
    });
  }
};



export const getAllHackathons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [hackathons, total] = await Promise.all([
      Hackathon.find()
        .populate("judges", "name email occupation company image")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),

      Hackathon.countDocuments()
    ]);

    res.json({
      success: true,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      },
      data: hackathons
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathons"
    });
  }
};




export const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate("judges", "name email occupation company image");

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    res.json({
      success: true,
      data: hackathon
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathon"
    });
  }
};
