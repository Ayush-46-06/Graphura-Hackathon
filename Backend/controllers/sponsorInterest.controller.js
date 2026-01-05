import { sendSponsorInterestMail } from "../services/mail.service.js";

export const sponsorInterest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      companyHQ,
      message
    } = req.body;

    if (!firstName || !lastName || !email || !companyHQ || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await sendSponsorInterestMail({
      firstName,
      lastName,
      email,
      companyHQ,
      message
    });

    res.status(200).json({
      success: true,
      message:
        "Your sponsorship interest has been submitted successfully. Our team will contact you soon."
    });
  } catch (error) {
    console.error("SPONSOR INTEREST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit sponsorship interest"
    });
  }
};
