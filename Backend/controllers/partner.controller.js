import Partner from "../models/Partner.model.js";
import {
  sendPartnerAdminMail,
  sendPartnerThankYouMail
} from "../services/mail.service.js";

export const applyPartner = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      workEmail,
      companyHQ,
      message
    } = req.body;

    const partner = await Partner.create({
      firstName,
      lastName,
      workEmail,
      companyHQ,
      message
    });

    // 📧 Mail to Graphura Admin
    await sendPartnerAdminMail({
      name: `${firstName} ${lastName}`,
      email: workEmail,
      companyHQ,
      message
    });

    // 📧 Thank you mail to applicant
    await sendPartnerThankYouMail({
      name: firstName,
      email: workEmail
    });

    res.status(201).json({
      success: true,
      message: "Partnership request submitted successfully"
    });

  } catch (error) {
    console.error("PARTNER APPLY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit partnership request"
    });
  }
};