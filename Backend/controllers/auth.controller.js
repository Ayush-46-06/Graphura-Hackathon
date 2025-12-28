import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Admin from "../models/Admin.model.js";
import { config } from "../config/env.js";


export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      contactNumber,
      university,
      college,
      occupation,
      company,
      role,
      adminSecret,
      courseName,
      yearOfStudy
    } = req.body;

    const image = req.file ? req.file.path : null;

  
    const userExists = await User.findOne({ email });
    const adminExists = await Admin.findOne({ email });

    if (userExists || adminExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    if (role === "admin") {
      if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({
          success: false,
          message: "Invalid admin secret key"
        });
      }

      await Admin.create({
        name,
        email,
        password: hashedPassword,
        address,
        contactNumber,
        university,
        college,
        occupation: occupation || null,
        company: company || null,
        image,
        yearOfStudy,
        courseName
      });

      return res.status(201).json({
        success: true,
        message: "Admin registered successfully"
      });
    }


    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      contactNumber,
      university,
      college,
      occupation: occupation || null,
      company: company || null,
      image,
      courseName,
      yearOfStudy
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let account = await User.findOne({ email }).select("+password");
    let role = "user";

    if (!account) {
      account = await Admin.findOne({ email }).select("+password");
      role = "admin";
    }

    if (!account) {
      return res.status(400).json({
        success: false,
        message: "Email not found"
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: account._id, role },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      role
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};


