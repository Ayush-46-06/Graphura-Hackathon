import User from "../models/User.model.js";
import Hackathon from "../models/Hackathon.model.js";
import Certificate from "../models/Certificate.model.js";
import googleSheetService from "../services/googleSheet.service.js";
import fs from "fs-extra";
import path from "path";
import PDFDocument from "pdfkit";
import Registration from "../models/Registration.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
};



export const declareHackathonResult = async (req, res) => {
  const { hackathonId, winners } = req.body;

  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon)
    return res.status(404).json({ success: false, message: "Hackathon not found" });

  const invalidUsers = [];

  // ✅ Check all winners are registered
  for (const userId of winners) {
    const registration = await Registration.findOne({ user: userId, hackathon: hackathonId });
    if (!registration) invalidUsers.push(userId);
  }

  if (invalidUsers.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Some users are not registered for this hackathon",
      invalidUsers
    });
  }

  // ✅ Proceed
  for (const userId of winners) {
    const user = await User.findById(userId);
    if (!user) continue;

    // 💰 Wallet update
    user.wallet += hackathon.prizePool || 0;
    await user.save();

    // 📁 Certificate folder
    const dir = path.join(process.cwd(), "uploads", "certificates", hackathonId);
    await fs.ensureDir(dir);
    const filePath = path.join(dir, `${userId}.pdf`);

    // 🔢 Numeric unique certificate ID
    const certificateId = `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

    // ================== CERTIFICATE PDF ==================
await new Promise((resolve, reject) => {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0
  });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // 🖼 STATIC CERTIFICATE IMAGE
  doc.image(
    path.join(process.cwd(), "assets", "certificate-template.jpg"),
    0,
    0,
    {
      width: doc.page.width,
      height: doc.page.height
    }
  );

  /* =====================================================
     🏆 HACKATHON TITLE
     (Slightly lower)
  ====================================================== */
  doc
    .font("Helvetica-Bold")
    .fontSize(28)
    .fillColor("#111827")
    .text(hackathon.title, 0, 200, {
      align: "center"
    });

  /* =====================================================
     🧑 USER NAME
     (Much lower – correct spacing)
  ====================================================== */
  doc
    .font("Helvetica-Bold")
    .fontSize(34)
    .fillColor("#0f172a")
    .text(user.name, 0, 315, {
      align: "center"
    });

  /* =====================================================
     🥇 FIRST PLACE TEXT
     (Placed inside pill area)
  ====================================================== */
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#92400e")
    .text(`First Place - ${hackathon.title}`, 0, 517, {
      align: "center"
    });

  /* =====================================================
     🆔 CERTIFICATE ID (Bottom-left)
  ====================================================== */
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#6b7280")
    .text(`Certificate ID: ${certificateId}`, 40, doc.page.height - 50);

  /* =====================================================
     📅 ISSUE DATE (Bottom-right)
  ====================================================== */
  doc
    .fontSize(9)
    .fillColor("#6b7280")
    .text(
      `Issued on: ${new Date().toDateString()}`,
      doc.page.width - 220,
      doc.page.height - 50
    );

  doc.end();

  stream.on("finish", resolve);
  stream.on("error", reject);
});




    // 📄 Save certificate record
    await Certificate.create({
      user: userId,
      hackathon: hackathonId,
      certificateUrl: `${req.protocol}://${req.get("host")}/certificates/${hackathonId}/${userId}.pdf`,
      certificateId
    });
  }

  hackathon.winners = winners;
  hackathon.status = "completed";
  await hackathon.save();

  res.json({
    success: true,
    message: "Results declared, wallets updated & certificates generated",
    count: winners.length
  });
};









export const exportStudentsToSheet = async (req, res) => {
  const users = await User.find().select("name email university");
  await googleSheetService.exportUsers(users);

  res.json({
    success: true,
    message: "Students exported to Google Sheet",
  });
};