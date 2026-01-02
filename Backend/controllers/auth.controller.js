import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Admin from "../models/Admin.model.js";
import { config } from "../config/env.js";
import {sendResetPasswordMail} from "../services/mail.service.js"
import crypto from "crypto"
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


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: true,
        message: "If email exists, reset link sent"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetLink = `${config.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendResetPasswordMail({
      userEmail: user.email,
      userName: user.name,
      resetLink
    });

    res.json({
      success: true,
      message: "Reset password link sent to email"
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password"
    });
  }
};
