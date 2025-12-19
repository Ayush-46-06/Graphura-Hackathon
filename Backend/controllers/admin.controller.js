import User from "../models/User.model.js";
import Hackathon from "../models/Hackathon.model.js";
import Certificate from "../models/Certificate.model.js";
import googleSheetService from "../services/googleSheet.service.js";
import fs from "fs-extra";
import path from "path";
import PDFDocument from "pdfkit";


export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
};



export const declareHackathonResult = async (req, res) => {
  const { hackathonId, winners } = req.body;

  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) return res.status(404).json({ success: false, message: "Hackathon not found" });

  hackathon.winners = winners;
  hackathon.status = "completed";
  await hackathon.save();

  for (const userId of winners) {
    const user = await User.findById(userId);
    if (!user) continue;

    const dir = path.join(process.cwd(), "uploads", "certificates", hackathonId);
    await fs.ensureDir(dir);

    const filePath = path.join(dir, `${userId}.pdf`);

    await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
        margin: 50
      });
      
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ========== BACKGROUND DESIGN ==========
      // Add decorative border
      doc.lineWidth(3);
      doc.roundedRect(40, 40, doc.page.width - 80, doc.page.height - 80, 10)
         .stroke();

      // Add subtle background pattern
      doc.fillColor('#f8f9fa');
      for (let i = 0; i < doc.page.width; i += 50) {
        for (let j = 0; j < doc.page.height; j += 50) {
          doc.circle(i, j, 1).fill();
        }
      }

      // ========== HEADER SECTION ==========
      // Add decorative line at top
      doc.lineWidth(2);
      doc.moveTo(100, 120)
         .lineTo(doc.page.width - 100, 120)
         .strokeColor('#4a6fa5')
         .stroke();

      // Certificate title
      doc.fontSize(42)
         .fillColor('#2c3e50')
         .font('Helvetica-Bold')
         .text('CERTIFICATE OF ACHIEVEMENT', {
           align: 'center',
           y: 140
         });

      // Subtitle
      doc.fontSize(18)
         .fillColor('#7f8c8d')
         .font('Helvetica-Oblique')
         .text('Presented to', {
           align: 'center',
           y: 210
         });

      // ========== PARTICIPANT NAME ==========
      doc.fontSize(36)
         .fillColor('#2980b9')
         .font('Helvetica-Bold')
         .text(user.name.toUpperCase(), {
           align: 'center',
           y: 240,
           characterSpacing: 1
         });

      // Decorative underline for name
      doc.lineWidth(1.5)
         .moveTo(doc.page.width / 2 - 100, 290)
         .lineTo(doc.page.width / 2 + 100, 290)
         .strokeColor('#3498db')
         .stroke();

      // ========== ACHIEVEMENT TEXT ==========
      doc.fontSize(16)
         .fillColor('#2c3e50')
         .font('Helvetica')
         .text('has successfully participated and demonstrated excellence in', {
           align: 'center',
           y: 320
         });

      // Hackathon name (highlighted)
      doc.fontSize(24)
         .fillColor('#e74c3c')
         .font('Helvetica-Bold')
         .text(hackathon.title, {
           align: 'center',
           y: 360
         });

      // ========== DETAILS SECTION ==========
      doc.fontSize(14)
         .fillColor('#34495e')
         .font('Helvetica')
         .text(`Duration: ${hackathon.startDate.toLocaleDateString('en-US', { 
           year: 'numeric', 
           month: 'long', 
           day: 'numeric' 
         })} - ${hackathon.endDate.toLocaleDateString('en-US', { 
           year: 'numeric', 
           month: 'long', 
           day: 'numeric' 
         })}`, {
           align: 'center',
           y: 410
         });

      // Add some decorative elements
      doc.fontSize(12)
         .fillColor('#95a5a6')
         .text('‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧', {
           align: 'center',
           y: 440
         });

      // ========== SIGNATURE SECTION ==========
      const yPosition = 480;
      
      // Left signature (Organizer)
      doc.fontSize(12)
         .fillColor('#2c3e50')
         .text('________________________', {
           x: 100,
           y: yPosition
         })
         .fontSize(10)
         .text('Organizer', {
           x: 100,
           y: yPosition + 20
         })
         .fontSize(10)
         .fillColor('#7f8c8d')
         .text('Graphura Hackathon Committee', {
           x: 100,
           y: yPosition + 35
         });

      // Right signature (Director)
      doc.fontSize(12)
         .fillColor('#2c3e50')
         .text('________________________', {
           x: doc.page.width - 200,
           y: yPosition
         })
         .fontSize(10)
         .text('Director', {
           x: doc.page.width - 200,
           y: yPosition + 20
         })
         .fontSize(10)
         .fillColor('#7f8c8d')
         .text('Technology Innovation Board', {
           x: doc.page.width - 200,
           y: yPosition + 35
         });

      // ========== FOOTER SECTION ==========
      // Certificate ID
      const certificateId = `CERT-${hackathonId.slice(-8).toUpperCase()}-${userId.slice(-8).toUpperCase()}`;
      
      doc.fontSize(10)
         .fillColor('#95a5a6')
         .text(`Certificate ID: ${certificateId}`, {
           align: 'center',
           y: doc.page.height - 80
         });

      // Date of issue
      doc.fontSize(10)
         .fillColor('#95a5a6')
         .text(`Date of Issue: ${new Date().toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric'
         })}`, {
           align: 'center',
           y: doc.page.height - 65
         });

      // Copyright/Footer note
      doc.fontSize(9)
         .fillColor('#bdc3c7')
         .text('This certificate is digitally generated and verifiable through our official portal.', {
           align: 'center',
           y: doc.page.height - 40
         });

      // Add decorative corner elements
      const cornerSize = 20;
      const corners = [
        [40, 40], // top-left
        [doc.page.width - 40, 40], // top-right
        [40, doc.page.height - 40], // bottom-left
        [doc.page.width - 40, doc.page.height - 40] // bottom-right
      ];

      corners.forEach(([x, y]) => {
        doc.lineWidth(2)
           .moveTo(x, y)
           .lineTo(x + cornerSize, y)
           .moveTo(x, y)
           .lineTo(x, y + cornerSize)
           .strokeColor('#4a6fa5')
           .stroke();
      });

      doc.end();

      stream.on("finish", () => {
        console.log(`Certificate generated successfully for user: ${user.name}`);
        console.log(`File saved to: ${filePath}`);
        resolve();
      });
      stream.on("error", reject);
    });

    console.log('File exists:', fs.existsSync(filePath));

    await Certificate.create({
      user: userId,
      hackathon: hackathonId,
      certificateUrl: `${req.protocol}://${req.get("host")}/certificates/${hackathonId}/${userId}.pdf`,
      certificateId: `CERT-${hackathonId.slice(-8).toUpperCase()}-${userId.slice(-8).toUpperCase()}`
    });
  }

  res.json({ 
    success: true, 
    message: "Results declared & professional certificates generated",
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