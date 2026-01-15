import mongoose from "mongoose";
import Hackathon from "../models/Hackathon.model.js";

/* ================= CREATE HACKATHON ================= */
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

    if (!req.files?.image?.length) {
      return res.status(400).json({
        success: false,
        message: "Hackathon banner image is required",
      });
    }

    /* FREE / PAID */
    if (req.body.isPaid === "true" || req.body.isPaid === true) {
      if (!req.body.entryFee || Number(req.body.entryFee) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Entry fee required for paid hackathon",
        });
      }
      req.body.isPaid = true;
      req.body.entryFee = Number(req.body.entryFee);
    } else {
      req.body.isPaid = false;
      req.body.entryFee = 0;
    }

    /* TEAM */
    if (req.body.participationType === "team") {
      req.body.maxTeamSize = req.body.maxTeamSize
        ? Number(req.body.maxTeamSize)
        : 4;
    } else {
      req.body.participationType = "solo";
      req.body.maxTeamSize = 1;
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
      participants: [], // activityPdf ❌ NOT HERE
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

/* ================= UPDATE HACKATHON ================= */
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

    /* 🔐 NEVER allow participants update manually */
    delete req.body.participants;
    delete req.body.winnerDetails;

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

/* ================= DELETE HACKATHON ================= */
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

/* ================= GET ALL HACKATHONS ================= */
export const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate(
        "judges",
        "name email occupation company image"
      )
      // 🏆 WINNERS (name, email, image)
      .populate(
        "winnerDetails.user",
        "name email image"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: hackathons,
    });

  } catch (error) {
    console.error("GET ALL HACKATHONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathons",
    });
  }
};
/* ================= GET HACKATHON BY ID ================= */
export const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate(
        "judges",
        "name email occupation company image"
      )
      // 🏆 WINNERS DETAILS
      .populate(
        "winnerDetails.user",
        "name email image"
      )
      // 👥 PARTICIPANTS DETAILS (optional but recommended)
      .populate(
        "participants.user",
        "name email image"
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
    console.error("GET HACKATHON ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathon",
    });
  }
};

export const uploadActivityPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Activity PDF is required",
      });
    }

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { activityPdf: req.file.path },
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
      message: "Activity PDF uploaded successfully",
      activityPdf: hackathon.activityPdf,
    });
  } catch (error) {
    console.error("UPLOAD ACTIVITY PDF ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload activity PDF",
    });
  }
};