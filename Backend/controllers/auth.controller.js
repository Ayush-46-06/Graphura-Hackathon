import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { config } from "../config/env.js";
import Admin from "../models/Admin.model.js";


export const register = async (req, res) => {
  const { name, email, password, contactNumber, university, college, address, role, adminSecret } = req.body;

  // Check if email exists in both collections
  const existsUser = await User.findOne({ email });
  const existsAdmin = await Admin.findOne({ email });

  if (existsUser || existsAdmin) {
    return res.status(400).json({
      success: false,
      message: "Email already registered"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "admin") {
    // Admin banane ke liye secret key check
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin secret key"
      });
    }

    // Admin create
    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully"
    });
  }

  // Normal user create
  await User.create({
    name,
    email,
    password: hashedPassword,
    contactNumber,
    university,
    college,
    address
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully"
  });
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email not found, please register"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password"
    });
  }


  user.password = undefined;

  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(400).json({
      success: false,
      message: "Admin email not found"
    });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password"
    });
  }

  admin.password = undefined;

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role
    }
  });
};
