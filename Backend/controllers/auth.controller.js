import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import { config } from "../config/env.js";

export const register = async (req, res) => {
  const { name, email, password, contactNumber, university, college } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Email already registered"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    contactNumber,
    university,
    college
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
      message: "Email not found please register"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token
  });
};
