import User from "../models/User.model.js";
import Hackathon from "../models/Hackathon.model.js";
import Registration from "../models/Registration.model.js";
import Certificate from "../models/Certificate.model.js";
import googleSheetService from "../services/googleSheet.service.js";
import { sendWinnerResultMail } from "../services/mail.service.js";

import PDFDocument from "pdfkit";
import path from "path";

/* ================= GET ALL USERS ================= */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
};

/* ================= EXPORT USERS ================= */
export const exportStudentsToSheet = async (req, res) => {
  const users = await User.find().select("name email university");
  await googleSheetService.exportUsers(users);
  res.json({ success: true, message: "Students exported to Google Sheet" });
};

/* ================= PRIZE SPLIT ================= */
const getPrizeSplit = (totalPrize, count) => {
  if (count === 1) return [totalPrize];
  if (count === 2) return [
    Math.floor(totalPrize * 0.6),
    Math.floor(totalPrize * 0.4)
  ];
  if (count === 3) return [
    Math.floor(totalPrize * 0.5),
    Math.floor(totalPrize * 0.3),
    Math.floor(totalPrize * 0.2)
  ];
  return [];
};

/* ================= DECLARE RESULT ================= */
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

    /* -------- Registration check -------- */
    for (const userId of winners) {
      const registered = await Registration.findOne({
        user: userId,
        hackathon: hackathonId
      });
      if (!registered) {
        return res.status(400).json({
          success: false,
          message: "Some users are not registered"
        });
      }
    }

    const prizeSplit = getPrizeSplit(hackathon.prizePool, winners.length);
    const winnerDetails = [];

    /* ================= MAIN LOOP ================= */
    for (let i = 0; i < winners.length; i++) {
      const user = await User.findById(winners[i]);
      if (!user) continue;

      /* Wallet */
      user.wallet += prizeSplit[i];
      await user.save();

      const certificateId = `${Date.now()}-${user._id}`;

      /* -------- PDF GENERATION -------- */
      const pdfBuffer = await new Promise((resolve, reject) => {
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape",
          margin: 0
        });

        const buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", reject);

        doc.image(
          path.join(process.cwd(), "assets", "certificate-template.jpg"),
          0, 0,
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

        doc.fontSize(14)
          .text(`${place} – ${hackathon.title}`, 0, 520, { align: "center" });

        doc.end();
      });

      /* -------- EMAIL WITH ATTACHMENT -------- */
      await sendWinnerResultMail({
        userName: user.name,
        userEmail: user.email,
        hackathonTitle: hackathon.title,
        rank: i + 1,
        prizeAmount: prizeSplit[i],
        pdfBuffer
      });

      /* -------- SAVE CERTIFICATE (FIXED) -------- */
      await Certificate.create({
        user: user._id,
        hackathon: hackathonId,
        certificateId,
        certificateUrl: `sent-via-email://${certificateId}`
      });

      winnerDetails.push({
        user: user._id,
        rank: i + 1,
        prizeAmount: prizeSplit[i]
      });
    }

    hackathon.winners = winners;
    hackathon.winnerDetails = winnerDetails;
    hackathon.status = "completed";
    await hackathon.save();

    res.json({
      success: true,
      message: "Results declared & certificates mailed successfully",
      winnerDetails
    });

  } catch (error) {
    console.error("DECLARE RESULT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to declare result"
    });
  }
};