import express from "express";
import College from "../models/College.model.js";

const router = express.Router();

router.get("/public/colleges", async (req, res) => {
  try {
    const colleges = await College.find({ isActive: true })
      .select("name shortName")
      .sort({ name: 1 });

    res.json({
      success: true,
      data: colleges
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges"
    });
  }
});

export default router;
