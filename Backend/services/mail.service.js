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
  endDate
}) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailPayload = {
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME
      },
      to: [{ email: userEmail }],
      subject: `✅ Registration Confirmed: ${hackathonTitle}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          </style>
        </head>
        <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; padding: 30px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🚀 Registration Confirmed!</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 10px; font-size: 16px;">You're officially in the competition</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px; background: #ffffff; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            
            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748; margin-bottom: 10px; font-size: 24px;">Hello ${userName},</h2>
              <p style="color: #4a5568; font-size: 16px;">Congratulations! Your registration for the hackathon has been successfully processed.</p>
            </div>
            
            <!-- Event Card -->
            <div style="background: linear-gradient(135deg, #f6f9ff 0%, #f0f4ff 100%); border-left: 4px solid #667eea; padding: 25px; border-radius: 8px; margin: 30px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #667eea; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 20px;">⚡</span>
                </div>
                <h3 style="color: #2d3748; margin: 0; font-size: 22px; font-weight: 600;">${hackathonTitle}</h3>
              </div>
              
              <!-- Event Details -->
              <div style="display: grid; grid-template-columns: 1fr; gap: 15px; margin-top: 20px;">
                <div style="display: flex; align-items: center;">
                  <div style="background: #e6fffa; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: #319795;">📅</span>
                  </div>
                  <div>
                    <div style="color: #4a5568; font-weight: 500; font-size: 14px;">START DATE</div>
                    <div style="color: #2d3748; font-weight: 600; font-size: 16px;">${formattedStartDate}</div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <div style="background: #fff5f5; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: #fc8181;">⏰</span>
                  </div>
                  <div>
                    <div style="color: #4a5568; font-weight: 500; font-size: 14px;">END DATE</div>
                    <div style="color: #2d3748; font-weight: 600; font-size: 16px;">${formattedEndDate}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Call to Action -->
            <div style="text-align: center; margin: 40px 0; padding: 25px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px;">
              <h3 style="color: #92400e; margin-bottom: 15px; font-size: 20px;">Ready to Innovate? 🚀</h3>
              <p style="color: #78350f; margin-bottom: 20px;">Start brainstorming ideas, forming teams, and preparing for an incredible journey of creation and innovation.</p>
              <a href="#" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; transition: transform 0.2s;">View Event Details</a>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #718096; margin-bottom: 20px;">Need assistance? We're here to help!</p>
              <a href="mailto:support@graphura.com" style="color: #667eea; text-decoration: none; font-weight: 500;">support@graphura.com</a>
              <p style="color: #a0aec0; margin-top: 30px; font-size: 14px;">© ${new Date().getFullYear()} Graphura. All rights reserved.</p>
            </div>
            
          </div>
          
        </body>
        </html>
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
  rank,
  prizeAmount,
  pdfBuffer
}) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    console.log("📧 Sending winner certificate to:", userEmail);

    await emailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME
      },
      to: [{ email: userEmail }],
      subject: `🏆 Congratulations! You Won ${hackathonTitle}`,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Winner Announcement</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; font-family: 'Poppins', Arial, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
  
  <!-- Email Container -->
  <div style="max-width: 680px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
    
    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 40px; text-align: center; position: relative; overflow: hidden;">
      <!-- Confetti Animation Effect -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='); background-size: 40px 40px;"></div>
      
      <!-- Trophy Icon -->
<div style="text-align: center;">
  <div style="
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    border: 8px solid rgba(255, 255, 255, 0.3);
  ">
    <span style="
      font-size: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    ">🏆</span>
  </div>
</div>
      
      <h1 style="font-family: 'Montserrat', sans-serif; font-size: 42px; font-weight: 800; color: white; margin: 0 0 15px 0; letter-spacing: -0.5px;">
        YOU'RE A WINNER!
      </h1>
      <p style="font-size: 20px; color: rgba(255, 255, 255, 0.95); margin: 0; font-weight: 300;">
        Celebrating Your Achievement in
      </p>
      <h2 style="font-family: 'Montserrat', sans-serif; font-size: 32px; color: white; margin: 15px 0 0 0; font-weight: 700;">
        ${hackathonTitle}
      </h2>
    </div>

    <!-- Content Section -->
    <div style="padding: 60px 40px; color: #333;">
      
      <!-- Greeting -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-family: 'Montserrat', sans-serif; font-size: 28px; color: #2d3748; margin: 0 0 20px 0;">
          Congratulations, <span style="color: #764ba2;">${userName}</span>! 🎉
        </h2>
        <p style="font-size: 18px; line-height: 1.6; color: #4a5568; margin: 0;">
          Your exceptional talent, creativity, and dedication have been recognized by our judges. We're thrilled to announce your outstanding achievement!
        </p>
      </div>

      <!-- Achievement Badge -->
      <div style="background: linear-gradient(135deg, #fff9e6 0%, #ffeaa7 100%); border-radius: 20px; padding: 30px; margin: 40px 0; text-align: center; border: 3px dashed #f1c40f; position: relative;">
        <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: #f1c40f; color: white; padding: 8px 24px; border-radius: 30px; font-weight: 700; font-size: 16px;">
          RANK ACHIEVED
        </div>
        <div style="font-family: 'Montserrat', sans-serif; font-size: 72px; font-weight: 800; color: #e67e22; margin: 10px 0;">
          #${rank}
        </div>
        <p style="font-size: 20px; color: #d35400; margin: 0; font-weight: 600;">
          Top Performer
        </p>
      </div>

      <!-- Details Grid -->
      <div style="background: #f8f9ff; border-radius: 20px; padding: 40px; margin: 40px 0;">
        <h3 style="font-family: 'Montserrat', sans-serif; font-size: 22px; color: #2d3748; margin: 0 0 30px 0; text-align: center;">
          🏆 Your Winning Details
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
          <!-- Hackathon Info -->
          <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <div style="width: 50px; height: 50px; background: #e3f2fd; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
              <div style="font-size: 24px;">🚀</div>
            </div>
            <div>
              <div style="font-size: 14px; color: #718096; font-weight: 600; margin-bottom: 5px;">HACKATHON</div>
              <div style="font-size: 18px; color: #2d3748; font-weight: 700;">${hackathonTitle}</div>
            </div>
          </div>

          <!-- Prize Info -->
          <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <div style="width: 50px; height: 50px; background: #f3e5f5; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
              <div style="font-size: 24px;">💰</div>
            </div>
            <div>
              <div style="font-size: 14px; color: #718096; font-weight: 600; margin-bottom: 5px;">PRIZE AMOUNT</div>
              <div style="font-size: 28px; color: #27ae60; font-weight: 800;">₹${prizeAmount}</div>
            </div>
          </div>

          <!-- Date & Time -->
          <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <div style="width: 50px; height: 50px; background: #e8f5e9; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
              <div style="font-size: 24px;">📅</div>
            </div>
            <div>
              <div style="font-size: 14px; color: #718096; font-weight: 600; margin-bottom: 5px;">ACHIEVEMENT DATE</div>
              <div style="font-size: 18px; color: #2d3748; font-weight: 700;">
                ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div style="font-size: 16px; color: #718096; margin-top: 2px;">
                ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certificate Section -->
      <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 20px; padding: 40px; margin: 40px 0; text-align: center; border: 2px solid #667eea30;">
        <div style="font-size: 48px; margin-bottom: 20px;">📜</div>
        <h3 style="font-family: 'Montserrat', sans-serif; font-size: 26px; color: #2d3748; margin: 0 0 15px 0;">
          Official Winner Certificate
        </h3>
        <p style="font-size: 18px; line-height: 1.6; color: #4a5568; margin: 0 0 25px 0;">
          Your digital certificate is attached with this email. Download it and share your achievement with the world! This certificate is a testament to your hard work and exceptional skills.
        </p>
        <div style="background: #667eea; color: white; display: inline-block; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
          📎 Certificate Attached
        </div>
      </div>

      <!-- Next Steps -->
      <div style="margin: 40px 0 0 0; padding: 30px; background: #f0f4ff; border-radius: 20px;">
        <h3 style="font-family: 'Montserrat', sans-serif; font-size: 22px; color: #2d3748; margin: 0 0 20px 0;">
          🎯 What's Next?
        </h3>
        <ul style="font-size: 17px; line-height: 1.8; color: #4a5568; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Our team will contact you within 48 hours regarding prize distribution</li>
          <li style="margin-bottom: 10px;">Share your achievement on LinkedIn and Twitter using #${hackathonTitle.replace(/\s+/g, '')}Winners</li>
          <li>Stay tuned for upcoming hackathons and events</li>
        </ul>
      </div>

      <!-- Final Message -->
      <div style="text-align: center; margin: 50px 0 30px 0; padding: 30px; background: linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%); border-radius: 20px;">
        <div style="font-size: 48px; margin-bottom: 20px;">🚀</div>
        <h3 style="font-family: 'Montserrat', sans-serif; font-size: 24px; color: #2d3748; margin: 0 0 15px 0;">
          Keep Innovating, Keep Winning!
        </h3>
        <p style="font-size: 18px; line-height: 1.6; color: #4a5568; margin: 0;">
          Your success inspires us all. We can't wait to see what you'll build next!
        </p>
      </div>

      <!-- Signature -->
      <div style="border-top: 2px solid #e2e8f0; padding-top: 40px; text-align: center;">
        <p style="font-size: 18px; color: #4a5568; margin: 0 0 5px 0;">
          With immense pride and admiration,
        </p>
        <p style="font-family: 'Montserrat', sans-serif; font-size: 28px; color: #764ba2; font-weight: 700; margin: 0;">
          Team Graphura
        </p>
        <p style="font-size: 16px; color: #718096; margin-top: 10px;">
          Empowering Innovators Worldwide
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); color: #cbd5e1; padding: 40px; text-align: center;">
      <div style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; color: white; margin-bottom: 20px;">
        Graphura
      </div>
      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; max-width: 400px; margin-left: auto; margin-right: auto;">
        Building the future, one hackathon at a time. Join our community of innovators.
      </p>
      <div style="margin: 30px 0;">
        <a href="#" style="display: inline-block; margin: 0 10px; color: #cbd5e1; text-decoration: none; font-size: 14px;">Website</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #cbd5e1; text-decoration: none; font-size: 14px;">Events</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #cbd5e1; text-decoration: none; font-size: 14px;">Community</a>
        <a href="#" style="display: inline-block; margin: 0 10px; color: #cbd5e1; text-decoration: none; font-size: 14px;">Contact</a>
      </div>
      <div style="border-top: 1px solid #4a5568; padding-top: 20px; font-size: 14px; color: #a0aec0;">
        © ${new Date().getFullYear()} Graphura. All rights reserved.<br>
        <div style="margin-top: 10px; font-size: 13px;">
          This is an automated message. Please do not reply to this email.
        </div>
      </div>
    </div>

  </div>

</body>
</html>
      `,
      attachment: [
        {
          content: pdfBuffer.toString("base64"),
          name: `Certificate-${hackathonTitle}.pdf`,
          type: "application/pdf"
        }
      ]
    });

    console.log("✅ Winner mail sent successfully");

  } catch (error) {
    console.error("❌ Winner mail error:", error.message);
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