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
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );

      if (invalidJudge) {
        return res.status(400).json({
          success: false,
          message: "Invalid judge ID provided",
        });
      }
    }


    if (!req.files?.image || req.files.image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Hackathon banner image is required",
      });
    }

  
    let sponsors = [];

    if (
      req.body.sponsorsName &&
      typeof req.body.sponsorsName === "string" &&
      req.files?.sponsors?.length
    ) {
      const sponsorNames = JSON.parse(req.body.sponsorsName);

      sponsors = sponsorNames.map((name, index) => ({
        name,
        logo: req.files.sponsors[index]?.path,
      }));
    }

    const hackathon = await Hackathon.create({
      ...req.body,
      image: req.files.image[0].path,
      sponsors,
    });

    res.status(201).json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    console.error("CREATE HACKATHON ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create hackathon",
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
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );

      if (invalidJudge) {
        return res.status(400).json({
          success: false,
          message: "Invalid judge ID provided",
        });
      }
    }


    if (req.files?.image?.length) {
      req.body.image = req.files.image[0].path;
    }


    if (
      req.body.sponsorsName &&
      typeof req.body.sponsorsName === "string" &&
      req.files?.sponsors?.length
    ) {
      const sponsorNames = JSON.parse(req.body.sponsorsName);

      req.body.sponsors = sponsorNames.map((name, index) => ({
        name,
        logo: req.files.sponsors[index]?.path,
      }));
    }

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found",
      });
    }

    res.json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    console.error("UPDATE HACKATHON ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hackathon",
    });
  }
};

export const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found",
      });
    }

    res.json({
      success: true,
      message: "Hackathon deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HACKATHON ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hackathon",
    });
  }
};

export const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate("judges", "name email occupation company image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: hackathons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathons",
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
        message: "Hackathon not found",
      });
    }

    res.json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathon",
    });
  }
};
