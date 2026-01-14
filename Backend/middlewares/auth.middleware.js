import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Admin from "../models/Admin.model.js";
import College from "../models/College.model.js";
import Judge from "../models/Judge.model.js";
import { config } from "../config/env.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const { id, role } = decoded;

    
    req.authRole = role;

    if (role === "admin") {
      const admin = await Admin.findById(id);
      if (!admin || !admin.isActive) throw new Error();
      req.admin = admin;
    }

    else if (role === "judge") {
      const judge = await Judge.findById(id);
      if (!judge || !judge.isActive) throw new Error();
      req.judge = judge;
    }

    else if (role === "college") {
      const college = await College.findById(id);
      if (!college || !college.isActive) throw new Error();
      req.college = college;
    }

    else if (role === "user") {
      const user = await User.findById(id);
      if (!user || !user.isActive) throw new Error();
      req.user = user;
    }

    else {
      throw new Error();
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};