import cron from "node-cron";
import Hackathon from "../models/Hackathon.model.js";
import { sendActivityPdfToParticipants } from "../services/mail.service.js";

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const hackathons = await Hackathon.find({
      status: "upcoming",
      startDate: { $lte: now },
      activityMailSent: false
    });

    for (const hackathon of hackathons) {
      // 🔄 Status update
      hackathon.status = "ongoing";
      hackathon.activityMailSent = true;
      await hackathon.save();

      // 📧 Send activity PDF
      await sendActivityPdfToParticipants(hackathon._id);

      console.log(`🚀 Activity PDF mail sent for: ${hackathon.title}`);
    }

  } catch (error) {
    console.error("ACTIVITY PDF CRON ERROR:", error);
  }
});