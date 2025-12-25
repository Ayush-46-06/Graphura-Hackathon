import User from "../models/User.model.js";
import Hackathon from "../models/Hackathon.model.js";
import Certificate from "../models/Certificate.model.js";
import googleSheetService from "../services/googleSheet.service.js";
import Registration from "../models/Registration.model.js";

import fs from "fs-extra";
import path from "path";
import PDFDocument from "pdfkit";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
};

/* ===================== PRIZE SPLIT ===================== */
const getPrizeSplit = (totalPrize, count) => {
  if (count === 1) return [totalPrize];
  if (count === 2)
    return [
      Math.floor(totalPrize * 0.6),
      Math.floor(totalPrize * 0.4)
    ];
  if (count === 3)
    return [
      Math.floor(totalPrize * 0.5),
      Math.floor(totalPrize * 0.3),
      Math.floor(totalPrize * 0.2)
    ];
  return [];
};

/* ===================== DECLARE RESULT ===================== */
export const declareHackathonResult = async (req, res) => {
  try {
    const { hackathonId, winners } = req.body;

    if (!Array.isArray(winners) || winners.length < 1 || winners.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Winners must be between 1 and 3 users"
      });
    }

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    if (hackathon.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Results already declared"
      });
    }

    /* ===================== VALIDATE REGISTRATION ===================== */
    const invalidUsers = [];
    for (const userId of winners) {
      const registered = await Registration.findOne({
        user: userId,
        hackathon: hackathonId
      });
      if (!registered) invalidUsers.push(userId);
    }

    if (invalidUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some users are not registered for this hackathon",
        invalidUsers
      });
    }

    /* ===================== PRIZE CALC ===================== */
    const prizeSplit = getPrizeSplit(hackathon.prizePool, winners.length);

    const winnerDetails = [];

    /* ===================== PROCESS EACH WINNER ===================== */
    for (let i = 0; i < winners.length; i++) {
      const userId = winners[i];
      const user = await User.findById(userId);
      if (!user) continue;

      /* Wallet update */
      user.wallet += prizeSplit[i];
      await user.save();

      /* Certificate directory */
      const dir = path.join(process.cwd(), "uploads", "certificates", hackathonId);
      await fs.ensureDir(dir);
      const filePath = path.join(dir, `${userId}.pdf`);

      const certificateId = `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

      /* ===================== CERTIFICATE ===================== */
      await new Promise((resolve, reject) => {
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape",
          margin: 0
        });

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.image(
          path.join(process.cwd(), "assets", "certificate-template.jpg"),
          0,
          0,
          { width: doc.page.width, height: doc.page.height }
        );

        doc.font("Helvetica-Bold")
          .fontSize(28)
          .text(hackathon.title, 0, 200, { align: "center" });

        doc.font("Helvetica-Bold")
          .fontSize(34)
          .text(user.name, 0, 315, { align: "center" });

        const place =
          i === 0 ? "First Place" :
          i === 1 ? "Second Place" :
          "Third Place";

        doc.font("Helvetica-Bold")
          .fontSize(14)
          .text(`${place} - ${hackathon.title}`, 0, 517, {
            align: "center"
          });

        doc.fontSize(9)
          .text(`Certificate ID: ${certificateId}`, 40, doc.page.height - 50);

        doc.fontSize(9)
          .text(
            `Issued on: ${new Date().toDateString()}`,
            doc.page.width - 220,
            doc.page.height - 50
          );

        doc.end();
        stream.on("finish", resolve);
        stream.on("error", reject);
      });

      await Certificate.create({
        user: userId,
        hackathon: hackathonId,
        certificateUrl: `${req.protocol}://${req.get("host")}/certificates/${hackathonId}/${userId}.pdf`,
        certificateId
      });

      winnerDetails.push({
        user: userId,
        rank: i + 1,
        prizeAmount: prizeSplit[i]
      });
    }

    /* ===================== SAVE HACKATHON ===================== */
    hackathon.winners = winners;
    hackathon.winnerDetails = winnerDetails;
    hackathon.status = "completed";
    await hackathon.save();

    res.json({
      success: true,
      message: "Results declared successfully",
      prizeSplit,
      winnerDetails
    });

  } catch (error) {
    console.error("DECLARE RESULT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to declare result",
      error: error.message
    });
  }
};

/* ===================== EXPORT USERS ===================== */
export const exportStudentsToSheet = async (req, res) => {
  const users = await User.find().select("name email university");
  await googleSheetService.exportUsers(users);

  res.json({
    success: true,
    message: "Students exported to Google Sheet"
  });
};
