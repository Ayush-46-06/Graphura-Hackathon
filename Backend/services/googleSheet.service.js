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

    // ✅ TWO DIFFERENT SHEETS
    this.adminSheetId = process.env.GOOGLE_SHEET_ID;
    this.collegeSheetId = process.env.COLLEGE_EXPORT_ID;
  }

  /* ================= ADMIN EXPORT ================= */
  async exportAdminUsers(users) {
    try {
      const rows = users.map((user) => [
        user.name,
        user.email,
        user.university,
        new Date().toLocaleString(),
      ]);

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.adminSheetId,
        range: "Sheet1!A:D",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: { values: rows },
      });

      console.log("✅ Admin users exported successfully!");
    } catch (error) {
      console.error("❌ Admin export error:", error.message);
      throw error;
    }
  }

  /* ================= COLLEGE EXPORT ================= */
  async exportCollegeUsers(users) {
    try {
      const rows = users.map((user) => [
        user.name,
        user.email,
        user.contactNumber,
        user.university,
        new Date().toLocaleString(),
      ]);

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.collegeSheetId,
        range: "Sheet1!A:E",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: { values: rows },
      });

      console.log("✅ College users exported successfully!");
    } catch (error) {
      console.error("❌ College export error:", error.message);
      throw error;
    }
  }
}

export default new GoogleSheetService();