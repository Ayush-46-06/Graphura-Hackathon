import cron from "node-cron";
import Hackathon from "../models/Hackathon.model.js";
import Registration from "../models/Registration.model.js";
import { sendHackathonReminderMail } from "../services/mail.service.js";

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();

    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const hackathons = await Hackathon.find({
      status: "upcoming",
      startDate: {
        $gte: tomorrowStart,
        $lte: tomorrowEnd
      },
      reminderMailSent: false
    });

    for (const hackathon of hackathons) {
      const registrations = await Registration.find({
        hackathon: hackathon._id
      }).populate("user", "name email");

      for (const reg of registrations) {
        if (!reg.user?.email) continue;

        await sendHackathonReminderMail({
          userName: reg.user.name,
          userEmail: reg.user.email,
          hackathonTitle: hackathon.title,
          startDate: hackathon.startDate
        });
      }

      hackathon.reminderMailSent = true;
      await hackathon.save();
    }

  } catch (err) {
    console.error("REMINDER CRON ERROR:", err);
  }
});