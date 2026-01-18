import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../config/env.js";
import { downloadPdfAsBuffer } from "../utils/downloadPdfBuffer.js";
import Hackathon from "../models/Hackathon.model.js"
import Registration from "../models/Registration.model.js"
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
      to: [{ email: "official.graphura@gmail.com" }],
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
  mode = "Online",
  duration = "48 Hours"
}) => {
  try {
    const start = new Date(startDate);

    const formattedDate = start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const formattedTime = start.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Hackathon Registration Confirmation | Graphura",
      htmlContent: `
        <p>Dear <b>${userName}</b>,</p>

        <p>
          Thank you for registering for the <b>Graphura Hackathon</b>.
          We are pleased to confirm your successful registration.
        </p>

        <p><b>Below are the important details of the hackathon:</b></p>

        <table cellpadding="6" cellspacing="0">
          <tr>
            <td><b>Hackathon Name</b></td>
            <td>: ${hackathonTitle}</td>
          </tr>
          <tr>
            <td><b>Start Date</b></td>
            <td>: ${formattedDate}</td>
          </tr>
          <tr>
            <td><b>Start Time</b></td>
            <td>: ${formattedTime} (IST)</td>
          </tr>
          <tr>
            <td><b>Mode</b></td>
            <td>: ${mode}</td>
          </tr>
          <tr>
            <td><b>Duration</b></td>
            <td>: ${duration}</td>
          </tr>
        </table>

        <p>
          Please ensure that you are available and prepared before the start time.
          Additional details regarding rules, problem statements, and submission
          guidelines will be shared once the hackathon begins.
        </p>

        <p>
          For any queries or assistance, feel free to reach out to us at
          <a href="mailto:support@graphura.com">support@graphura.com</a>.
        </p>

        <p>
          We look forward to your participation and wish you all the best for the hackathon.
        </p>

        <p>
          Warm regards,<br/>
          <b>Team Graphura</b><br/>
          Graphura India Private Limited<br/>
          <a href="https://graphura.com">https://graphura.com</a>
        </p>
      `
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
  startDate,
  mode = "Online",
  duration = "48 Hours",
  theme = "Hackathon Challenge",
  pdfBuffer
}) => {
  try {
    const start = new Date(startDate);

    const formattedDate = start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const formattedTime = start.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Congratulations! You Are a Winner – Graphura Hackathon",
      htmlContent: `
        <p>Dear <b>${userName}</b>,</p>

        <p>
          <b>Congratulations! 🎉</b><br/>
          We are delighted to inform you that you have emerged as a 
          <b>Winner of the Graphura Hackathon</b>.
        </p>

        <p>
          Your performance, innovation, and problem-solving approach truly stood out
          among all participants.
        </p>

        <p><b>Below are the official details of the hackathon for your reference:</b></p>

        <table cellpadding="6" cellspacing="0">
          <tr>
            <td><b>Hackathon Name</b></td>
            <td>: ${hackathonTitle}</td>
          </tr>
          <tr>
            <td><b>Organized By</b></td>
            <td>: Graphura India Private Limited</td>
          </tr>
          <tr>
            <td><b>Hackathon Start Date</b></td>
            <td>: ${formattedDate}</td>
          </tr>
          <tr>
            <td><b>Start Time</b></td>
            <td>: ${formattedTime} (IST)</td>
          </tr>
          <tr>
            <td><b>Mode</b></td>
            <td>: ${mode}</td>
          </tr>
          <tr>
            <td><b>Duration</b></td>
            <td>: ${duration}</td>
          </tr>
          <tr>
            <td><b>Theme / Problem Statement</b></td>
            <td>: ${theme}</td>
          </tr>
        </table>

        <p>
          Based on the evaluation criteria, your submission was selected as one of
          the top entries. We sincerely appreciate the effort, dedication, and
          creativity you demonstrated throughout the hackathon.
        </p>

        <p><b>Prize Details:</b></p>
        <p>
          <b>Position:</b> ${rank}
        </p>

        <p>
          📎 Your winner certificate is attached with this email.
        </p>

        <p>
          Once again, congratulations on your achievement. We look forward to seeing
          you participate in more initiatives organized by Graphura.
        </p>

        <p>
          Warm regards,<br/>
          <b>Team Graphura</b><br/>
          Graphura India Private Limited<br/>
          <a href="https://graphura.com">https://graphura.com</a>
        </p>
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
      to: [{ email: "official.graphura@gmail.com" }],
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
      to: [{ email: "official.graphura@gmail.com" }],
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


export const sendActivityPdfToParticipants = async (hackathonId) => {
  try {
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon || !hackathon.activityPdf) return;

    const registrations = await Registration.find({
      hackathon: hackathonId
    }).populate("user", "name email");

    if (!registrations.length) return;

    // 🔥 Download PDF only once
    const pdfBuffer = await downloadPdfAsBuffer(hackathon.activityPdf);

    for (const reg of registrations) {
      if (!reg.user?.email) continue;

      await emailApi.sendTransacEmail({
        sender: {
          email: config.BREVO_SENDER_EMAIL,
          name: "Graphura"
        },
        to: [{ email: reg.user.email }],
        subject: `🚀 Hackathon Started – ${hackathon.title}`,
        htmlContent: `
          <p>Hello <b>${reg.user.name}</b>,</p>

          <p>The hackathon <b>${hackathon.title}</b> has officially started!</p>

          <p>📎 Activity / Problem Statement PDF is attached.</p>

          <p>Good luck & happy hacking!<br/>Team Graphura</p>
        `,
        attachment: [
          {
            content: pdfBuffer.toString("base64"),
            name: `${hackathon.title}-Problem-Statement.pdf`,
            type: "application/pdf"
          }
        ]
      });
    }

    console.log(`✅ Activity PDF sent for hackathon: ${hackathon.title}`);

  } catch (error) {
    console.error("❌ Activity PDF Mail Error:", error.message);
  }
};


export const sendHackathonReminderMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  startDate,
  supportEmail = "support@graphura.com"
}) => {
  try {
    const start = new Date(startDate);

    const formattedDate = start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const formattedTime = start.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Reminder: Graphura Hackathon – Starting Tomorrow",
      htmlContent: `
        <p>Dear <b>${userName}</b>,</p>

        <p>
          This is a reminder that the <b>Graphura Hackathon</b> you registered for
          will commence <b>tomorrow</b> as per the schedule shared earlier.
        </p>

        <p><b>Hackathon Details:</b></p>

        <table cellpadding="6" cellspacing="0">
          <tr>
            <td><b>Hackathon Name</b></td>
            <td>: ${hackathonTitle}</td>
          </tr>
          <tr>
            <td><b>Start Date</b></td>
            <td>: ${formattedDate}</td>
          </tr>
          <tr>
            <td><b>Start Time</b></td>
            <td>: ${formattedTime} (IST)</td>
          </tr>
        </table>

        <p>
          Please ensure your availability and readiness before the start time.
          Any final instructions or updates will be communicated prior to the
          commencement of the hackathon.
        </p>

        <p>
          For any assistance, feel free to contact us at
          <a href="mailto:${supportEmail}">${supportEmail}</a>.
        </p>

        <p>
          Warm regards,<br/>
          <b>Team Graphura</b><br/>
          Graphura India Private Limited<br/>
          <a href="https://graphura.com">https://graphura.com</a>
        </p>
      `
    });

  } catch (error) {
    console.error("❌ Reminder Mail Error:", error);
  }
};

export const sendParticipantsMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  pdfBuffer
}) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: `🎉 Participation Certificate – ${hackathonTitle}`,
      htmlContent: `
        <p>Dear <b>${userName}</b>,</p>

        <p>
          Thank you for participating in the <b>${hackathonTitle}</b>
          organized by <b>Graphura India Private Limited</b>.
        </p>

        <p>
          We truly appreciate your effort, dedication, and enthusiasm
          throughout the hackathon.
        </p>

        <p>
          📎 Your <b>Participation Certificate</b> is attached with this email.
        </p>

        <p>
          We look forward to your participation in our future hackathons.
        </p>

        <p>
          Warm regards,<br/>
          <b>Team Graphura</b>
        </p>
      `,
      attachment: [
        {
          content: pdfBuffer.toString("base64"),
          name: `Participation-Certificate-${hackathonTitle}.pdf`,
          type: "application/pdf"
        }
      ]
    });
  } catch (error) {
    console.error("❌ Participation Mail Error:", error);
  }
};