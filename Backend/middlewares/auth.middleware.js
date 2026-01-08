import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Admin from "../models/Admin.model.js";
import College from "../models/College.model.js";
import { config } from "../config/env.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const { id, role } = decoded;

    if (role === "admin") {
      const admin = await Admin.findById(id);
      if (!admin) throw new Error();
      req.admin = admin;
    }

    else if (role === "college") {
      const college = await College.findById(id);
      if (!college || !college.isActive) throw new Error();
      req.college = college;
    }

    else {
      const user = await User.findById(id);
      if (!user || !user.isActive) throw new Error();
      req.user = user;
    }

    next();

  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};