import SibApiV3Sdk from "sib-api-v3-sdk";
import {config} from "../config/env.js"

export const sendContactMail = async (data) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailPayload = {
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME
      },
      to: [
        { email: "abhihivarkar783@gmail.com" }
      ],
      subject: `${data.subject}`,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Query</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Animation Keyframes */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keylines shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
  </style>
</head>
<body style="margin:0; padding:0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 0;">
    <tr>
      <td align="center">
        
        <!-- Animated Decorative Elements -->
        <div style="position: absolute; top: 20%; left: 10%; width: 60px; height: 60px; border-radius: 50%; background: rgba(255,255,255,0.1); animation: float 6s ease-in-out infinite;"></div>
        <div style="position: absolute; bottom: 30%; right: 15%; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.08); animation: float 4s ease-in-out infinite 2s;"></div>

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.15); position: relative; z-index: 1; animation: fadeIn 0.8s ease-out;">
          
          <!-- Animated Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef); background-size: 200% 200%; animation: gradientShift 5s ease infinite; padding:32px; text-align:center;">
              <div style="display: inline-block; animation: float 3s ease-in-out infinite;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h1 style="margin:16px 0 0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:-0.5px;">
                New Contact Request
              </h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.9); font-size:14px; font-weight:400;">
                Graphura Contact System
              </p>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding:40px;">
              
              <!-- Contact Info Card -->
              <div style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius:12px; padding:24px; margin-bottom:32px; border:1px solid #e2e8f0; animation: fadeIn 0.6s ease-out 0.2s both;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                  <tr>
                    <td width="30%" style="padding:12px 0; color:#64748b; font-weight:500;">👤 Name</td>
                    <td style="padding:12px 0; color:#1e293b; font-weight:600;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:#64748b; font-weight:500;">✉️ Email</td>
                    <td style="padding:12px 0;">
                      <a href="mailto:${data.email}" style="color:#6366f1; text-decoration:none; font-weight:600; transition: color 0.3s ease;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:#64748b; font-weight:500;">📱 Phone</td>
                    <td style="padding:12px 0; color:#1e293b; font-weight:600;">${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:#64748b; font-weight:500;">🎯 Subject</td>
                    <td style="padding:12px 0;">
                      <span style="background:linear-gradient(135deg, #6366f1, #8b5cf6); color:white; padding:4px 12px; border-radius:20px; font-size:13px; font-weight:500; display:inline-block; animation: fadeIn 0.6s ease-out 0.4s both;">
                        ${data.subject}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Section -->
              <div style="animation: fadeIn 0.6s ease-out 0.6s both;">
                <h3 style="margin:0 0 16px; color:#1e293b; font-size:16px; font-weight:600; display:flex; align-items:center; gap:8px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Message Details
                </h3>
                <div style="background:#ffffff; border:2px solid #f1f5f9; border-radius:12px; padding:24px; box-shadow:0 4px 12px rgba(99, 102, 241, 0.08); transition: all 0.3s ease; position: relative; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.05), transparent); background-size: 200% 100%; animation: shimmer 3s infinite; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;"></div>
                  <p style="margin:0; color:#475569; line-height:1.6; font-size:15px; position: relative; z-index: 1;">
                    ${data.message}
                  </p>
                </div>
              </div>

              <!-- Timeline -->
              <div style="margin-top:32px; padding:20px; background:#f8fafc; border-radius:12px; animation: fadeIn 0.6s ease-out 0.8s both;">
                <div style="display:flex; align-items:center; justify-content:space-between; color:#64748b; font-size:13px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:8px; height:8px; background:#10b981; border-radius:50%;"></div>
                    <span>Received</span>
                  </div>
                  <div style="color:#1e293b; font-weight:500;">
                    ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1e293b; padding:28px; text-align:center;">
              <div style="animation: fadeIn 0.6s ease-out 1s both;">
                <div style="color:#cbd5e1; font-size:14px; margin-bottom:12px;">
                  This message was sent from the Graphura Contact System
                </div>
                <div style="color:#94a3b8; font-size:12px;">
                  <p style="margin:4px 0;">
                    Please respond within 24 hours for optimal engagement
                  </p>
                  <p style="margin:8px 0 0; border-top:1px solid rgba(255,255,255,0.1); padding-top:12px;">
                    © ${new Date().getFullYear()} Graphura. All rights reserved.
                  </p>
                </div>
              </div>
            </td>
          </tr>

        </table>

        <!-- Watermark -->
        <div style="text-align:center; margin-top:20px; color:rgba(255,255,255,0.5); font-size:12px; animation: fadeIn 1.2s ease-out;">
          🔒 Secured by Brevo | 📧 Email ID: #${Date.now().toString().slice(-8)}
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
`
    };

    await emailApi.sendTransacEmail(emailPayload);
  } catch (error) {
    console.error("❌ Brevo Email Error:", error);
    throw error;
  }
};


export const sendHackathonRegistrationMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  startDate,
  startTime = "10:00 AM",
  mode = "Online",
  duration = "48 Hours"
}) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const formattedStartDate = new Date(startDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const emailPayload = {
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Hackathon Registration Confirmation | Graphura",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
          
          <p>Dear <strong>${userName}</strong>,</p>

          <p>
            Thank you for registering for the <strong>Graphura Hackathon</strong>.
            We are pleased to confirm your successful registration.
          </p>

          <p><strong>Below are the important details of the hackathon:</strong></p>

          <table cellpadding="6" cellspacing="0" border="0">
            <tr>
              <td><strong>Hackathon Name:</strong></td>
              <td>${hackathonTitle}</td>
            </tr>
            <tr>
              <td><strong>Start Date:</strong></td>
              <td>${formattedStartDate}</td>
            </tr>
            <tr>
              <td><strong>Start Time:</strong></td>
              <td>${startTime} (IST)</td>
            </tr>
            <tr>
              <td><strong>Mode:</strong></td>
              <td>${mode}</td>
            </tr>
            <tr>
              <td><strong>Duration:</strong></td>
              <td>${duration}</td>
            </tr>
          </table>

          <p>
            Please ensure that you are available and prepared before the start time.
            Additional details regarding rules, problem statements, and submission
            guidelines will be shared shortly.
          </p>

          <p>
            For any queries or assistance, feel free to reach out to us at
            <a href="mailto:support@graphura.com">support@graphura.com</a>.
          </p>

          <p>
            We look forward to your participation and wish you all the best for the hackathon.
          </p>

          <p>
            Warm regards,<br>
            <strong>Team Graphura</strong><br>
            Graphura India Private Limited<br>
            <a href="https://graphura.com">www.graphura.com</a>
          </p>

        </div>
      `
    };

    await emailApi.sendTransacEmail(emailPayload);

  } catch (error) {
    console.error("❌ Hackathon Registration Mail Error:", error);
  }
};


export const sendWinnerResultMail = async ({
  userName,
  userEmail,
  hackathonTitle,
  startDate,
  startTime = "10:00 AM",
  mode = "Online",
  duration = "48 Hours",
  theme = "Problem Statement",
  rank,
  pdfBuffer
}) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const formattedStartDate = new Date(startDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const emailPayload = {
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: "Graphura"
      },
      to: [{ email: userEmail }],
      subject: "Congratulations! You Are a Winner – Graphura Hackathon",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">

          <p>Dear <strong>${userName}</strong>,</p>

          <p>
            <strong>Congratulations! 🎉</strong><br>
            We are delighted to inform you that you have emerged as a 
            <strong>Winner of the Graphura Hackathon</strong>.
          </p>

          <p>
            Your performance, innovation, and problem-solving approach truly
            stood out among all participants.
          </p>

          <p><strong>Below are the official details of the hackathon for your reference:</strong></p>

          <table cellpadding="6" cellspacing="0" border="0">
            <tr>
              <td><strong>Hackathon Name:</strong></td>
              <td>${hackathonTitle}</td>
            </tr>
            <tr>
              <td><strong>Organized By:</strong></td>
              <td>Graphura India Private Limited</td>
            </tr>
            <tr>
              <td><strong>Hackathon Start Date:</strong></td>
              <td>${formattedStartDate}</td>
            </tr>
            <tr>
              <td><strong>Start Time:</strong></td>
              <td>${startTime} (IST)</td>
            </tr>
            <tr>
              <td><strong>Mode:</strong></td>
              <td>${mode}</td>
            </tr>
            <tr>
              <td><strong>Duration:</strong></td>
              <td>${duration}</td>
            </tr>
            <tr>
              <td><strong>Theme / Problem Statement:</strong></td>
              <td>${theme}</td>
            </tr>
          </table>

          <p>
            Based on the evaluation criteria, your submission was selected as one
            of the top entries. We sincerely appreciate the effort, dedication,
            and creativity you demonstrated throughout the hackathon.
          </p>

          <p><strong>Prize Details:</strong></p>
          <ul>
            <li><strong>Position:</strong> ${rank}</li>
          </ul>

          <p>
            Once again, congratulations on your achievement.
            We look forward to seeing you participate in more initiatives
            organized by Graphura.
          </p>

          <p>
            Warm regards,<br>
            <strong>Team Graphura</strong><br>
            Graphura India Private Limited<br>
            <a href="https://graphura.com">www.graphura.com</a>
          </p>

        </div>
      `,
      attachment: [
        {
          content: pdfBuffer.toString("base64"),
          name: `Winner-Certificate-${hackathonTitle}.pdf`,
          type: "application/pdf"
        }
      ]
    };

    await emailApi.sendTransacEmail(emailPayload);

    console.log("✅ Winner result mail sent successfully");

  } catch (error) {
    console.error("❌ Winner mail error:", error);
    throw error;
  }
};


export const sendResetPasswordMail = async ({
  userEmail,
  userName,
  resetLink
}) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

  const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  await emailApi.sendTransacEmail({
    sender: {
      email: config.BREVO_SENDER_EMAIL,
      name: config.BREVO_SENDER_NAME
    },
    to: [{ email: userEmail }],
    subject: "🔐 Reset Your Password",
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🔐 Password Reset</h1>
        </div>
        
        <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h2 style="color: #333; margin-top: 0;">Hello ${userName},</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            You requested to reset your password. Click the button below to create a new one.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
              🔑 Reset Password
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="color: #ff6b6b; margin: 0; font-size: 14px; font-weight: 500;">
              ⏳ This link expires in <strong>15 minutes</strong> for your security.
            </p>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.5; border-top: 1px solid #eee; padding-top: 16px; margin-bottom: 0;">
            If you didn't request this, you can safely ignore this email.
            <br><br>
            <small style="color: #ccc;">This is an automated message, please do not reply.</small>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 24px;">
          <p style="color: #999; font-size: 12px;">
            Sent with ❤️ from ${config.BREVO_SENDER_NAME}
          </p>
        </div>
      </div>
    `
  });
};




export const sendSponsorInterestMail = async (data) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = config.BREVO_API_KEY;

  const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  await emailApi.sendTransacEmail({
    sender: {
      email: config.BREVO_SENDER_EMAIL,
      name: config.BREVO_SENDER_NAME
    },
    to: [{ email: "abhihivarkar783@gmail.com" }],
    subject: "New Sponsorship Interest – Graphura",
    htmlContent: `
      <h3>New Sponsorship Inquiry</h3>
      <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Company HQ:</b> ${data.companyHQ}</p>
      <p><b>Message:</b><br/>${data.message}</p>
    `
  });
};

