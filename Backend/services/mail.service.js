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
        <div style="font-family: Arial, sans-serif">
          <h2>New Contact Query</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          <hr/>
          <p style="color:gray">Graphura Contact System</p>
        </div>
      `
    };

    await emailApi.sendTransacEmail(emailPayload);
  } catch (error) {
    console.error("❌ Brevo Email Error:", error);
    throw error;
  }
};
