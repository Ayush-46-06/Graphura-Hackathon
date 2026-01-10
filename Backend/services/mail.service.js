import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../config/env.js";
import { downloadPdfAsBuffer } from "../utils/downloadPdfBuffer.js";

/* =====================================================
   🔐 BREVO GLOBAL SETUP (ONLY ONCE)
===================================================== */
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/* =====================================================
   📩 CONTACT MAIL
===================================================== */
export const sendContactMail = async (data) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME
      },
      to: [{ email: "abhihivarkar783@gmail.com" }],
      subject: data.subject,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Query</title>
</head>
<body>
  <h2>New Contact Request</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Phone:</strong> ${data.phone}</p>
  <p><strong>Message:</strong></p>
  <p>${data.message}</p>
</body>
</html>
`
    });
  } catch (error) {
    console.error("❌ Brevo Contact Mail Error:", error);
    throw error;
  }
};

/* =====================================================
   🧑‍💻 HACKATHON REGISTRATION MAIL
===================================================== */

export const sendHackathonRegistrationMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  startDate,
  activityPdf
}) => {
  try {
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-IN");

    let attachments = [];

    if (activityPdf) {
      const pdfBuffer = await downloadPdfAsBuffer(activityPdf);

      attachments.push({
        content: pdfBuffer.toString("base64"),
        name: `${hackathonTitle}-Activity.pdf`,
        type: "application/pdf"
      });
    }

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Hackathon Registration Confirmation | Graphura",
      htmlContent: `
        <p>Dear <b>${userName}</b>,</p>

        <p>You are successfully registered for <b>${hackathonTitle}</b>.</p>

        <ul>
          <li>Date: ${formattedStartDate}</li>
          <li>Mode: Online</li>
          <li>Duration: 48 Hours</li>
        </ul>

        <p>
          📎 Hackathon Activity PDF is attached with this email.
        </p>

        <p>Best of luck!<br/>Team Graphura</p>
      `,
      attachment: attachments
    });

  } catch (error) {
    console.error("❌ Registration Mail Error:", error);
  }
};

/* =====================================================
   🏆 WINNER RESULT MAIL
===================================================== */
export const sendWinnerResultMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  rank,
  pdfBuffer
}) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "🎉 Congratulations! You Are a Winner",
      htmlContent: `
        <p>Dear ${userName},</p>
        <p>Congratulations! You secured <b>${rank}</b> position in ${hackathonTitle}.</p>
      `,
      attachment: [
        {
          content: pdfBuffer.toString("base64"),
          name: `Winner-Certificate-${hackathonTitle}.pdf`,
          type: "application/pdf"
        }
      ]
    });
  } catch (error) {
    console.error("❌ Winner Mail Error:", error);
    throw error;
  }
};

/* =====================================================
   🔐 RESET PASSWORD MAIL
===================================================== */
export const sendResetPasswordMail = async ({
  userEmail,
  userName,
  resetLink
}) => {
  await emailApi.sendTransacEmail({
    sender: {
      email: config.BREVO_SENDER_EMAIL,
      name: config.BREVO_SENDER_NAME
    },
    to: [{ email: userEmail }],
    subject: "🔐 Reset Your Password",
    htmlContent: `
      <p>Hello ${userName},</p>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `
  });
};

/* =====================================================
   🎓 COLLEGE CREDENTIALS MAIL
===================================================== */
export const sendCollegeCredentialsMail = async ({
  collegeName,
  collegeEmail,
  password
}) => {
  try {
    const loginUrl = `${process.env.CLIENT_URL}/college-login`;

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura Team"
      },
      to: [{ email: collegeEmail }],
      subject: "🎓 College Login Credentials | Graphura",
      htmlContent: `
        <h2>Hello ${collegeName},</h2>
        <p>Your college account has been created.</p>
        <p><b>Email:</b> ${collegeEmail}</p>
        <p><b>Password:</b> ${password}</p>
        <a href="${loginUrl}">Login to College Dashboard</a>
      `
    });
  } catch (error) {
    console.error("❌ College Credential Mail Error:", error);
    throw error;
  }
};

/* =====================================================
   🤝 PARTNER ADMIN MAIL
===================================================== */
export const sendPartnerAdminMail = async ({
  name,
  email,
  companyHQ,
  message
}) => {
  try {
    // 🔑 IMPORTANT: Re-attach API key
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura Website"
      },
      to: [{ email: "abhi783@gmail.com" }],
      subject: "🤝 New Partnership Application – Graphura",
      htmlContent: `
        <h3>New Partnership Application</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company HQ:</strong> ${companyHQ}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    console.log("✅ Partner admin mail sent");

  } catch (error) {
    console.error("❌ Partner Admin Mail Error:", error);
    throw error;
  }
};

/* =====================================================
   🤝 PARTNER THANK YOU MAIL
===================================================== */
export const sendPartnerThankYouMail = async ({
  name,
  email
}) => {
  try {
    // 🔑 IMPORTANT: Re-attach API key
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura Team"
      },
      to: [{ email }],
      subject: "Thank You for Partnering with Graphura 🤝",
      htmlContent: `
        <p>Hello ${name},</p>
        <p>
          Thank you for applying for partnership with <strong>Graphura</strong>.
        </p>
        <p>
          Our team has received your request and will get back to you shortly.
        </p>
        <p>
          Warm regards,<br/>
          <strong>Team Graphura</strong>
        </p>
      `
    });

    console.log("✅ Partner thank-you mail sent");

  } catch (error) {
    console.error("❌ Partner Thank You Mail Error:", error);
    throw error;
  }
};


/* =====================================================
   💼 SPONSOR / PARTNER INTEREST MAIL (ADMIN)
===================================================== */
export const sendSponsorInterestMail = async ({
  firstName,
  lastName,
  email,
  companyHQ,
  message
}) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME
      },
      to: [{ email: "abhihivarkar783@gmail.com" }],
      subject: "🤝 New Sponsorship Interest – Graphura",
      htmlContent: `
        <h2>New Sponsorship / Partnership Inquiry</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company HQ:</strong> ${companyHQ}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>

        <hr />
        <p style="font-size:12px;color:#666;">
          Submitted from Graphura Partner Page
        </p>
      `
    });

  } catch (error) {
    console.error("❌ Sponsor Interest Mail Error:", error);
    throw error;
  }
};