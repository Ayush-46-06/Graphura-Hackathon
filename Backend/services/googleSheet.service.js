// services/googleSheetService.js
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

class GoogleSheetService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth: this.auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  // Export users to Google Sheet
  async exportUsers(users) {
    try {
      // Prepare rows
      const rows = users.map((user) => [
        user.name,
        user.email,
        user.university,
        new Date().toLocaleString(),
      ]);

      // Append rows to sheet
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "Sheet1!A:D", // change sheet name if needed
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: { values: rows },
      });

      console.log("Users exported successfully!");
    } catch (error) {
      console.error("Error exporting users:", error);
      throw error;
    }
  }
}

export default new GoogleSheetService();
