import College from "../models/College.model.js";
import User from "../models/User.model.js";
import Registration from "../models/Registration.model.js";
import bcrypt from "bcryptjs";
import { sendCollegeCredentialsMail } from "../services/mail.service.js";
import googleSheetService from "../services/googleSheet.service.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
/* ================= CREATE COLLEGE (ADMIN) ================= */





/* ================= COLLEGE LOGIN ================= */
export const collegeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const college = await College.findOne({ email })
      .select("+password");

    if (!college || !college.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, college.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: college._id, role: "college" },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      role: "college"
    });

  } catch (error) {
    console.error("COLLEGE LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

export const createCollege = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;

    const exists = await College.findOne({
      $or: [{ email }, { name }]
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "College already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const college = await College.create({
      name,
      email,
      password: hashedPassword,
      city,
      state
    });

    /* 📧 SEND LOGIN CREDENTIALS MAIL */
    await sendCollegeCredentialsMail({
      collegeName: name,
      collegeEmail: email,
      password,
      loginUrl: `${process.env.FRONTEND_URL}/college-login`
    });

    res.status(201).json({
      success: true,
      message: "College created and credentials sent via email",
      data: college
    });

  } catch (error) {
    console.error("CREATE COLLEGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create college"
    });
  }
};

/* ================= GET ALL COLLEGES ================= */
export const getAllColleges = async (req, res) => {
  const colleges = await College.find().sort({ createdAt: -1 });
  res.json({ success: true, data: colleges });
};

/* ================= GET COLLEGE BY ID ================= */
export const getCollegeById = async (req, res) => {
  const college = await College.findById(req.params.id).select("-password");

  if (!college) {
    return res.status(404).json({
      success: false,
      message: "College not found"
    });
  }

  res.json({ success: true, data: college });
};

/* ================= UPDATE COLLEGE ================= */
export const updateCollege = async (req, res) => {
  const updateData = { ...req.body };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const college = await College.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  if (!college) {
    return res.status(404).json({
      success: false,
      message: "College not found"
    });
  }

  res.json({
    success: true,
    message: "College updated successfully",
    data: college
  });
};

/* ================= COLLEGE STUDENTS LIST ================= */
export const getCollegeStudents = async (req, res) => {
  try {
    const collegeName = req.college.name;

    // Step 1: get all users of this college
    const users = await User.find({ collegeName })
      .select("name email contactNumber");

    // Step 2: attach hackathon names
    const result = await Promise.all(
      users.map(async (user) => {
        const registrations = await Registration.find({
          user: user._id
        }).populate("hackathon", "title");

        return {
          name: user.name,
          email: user.email,
          contactNumber: user.contactNumber,
          hackathons: registrations.map(r => r.hackathon.title)
        };
      })
    );

    res.json({
      success: true,
      count: result.length,
      data: result
    });

  } catch (error) {
    console.error("COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college students"
    });
  }
};

/* ================= EXPORT TO GOOGLE SHEET ================= */
export const exportCollegeStudents = async (req, res) => {
  try {
    const collegeName = req.college.name;

    const users = await User.find({ collegeName }).select(
      "name email contactNumber university"
    );

    await googleSheetService.exportCollegeUsers(users);

    res.json({
      success: true,
      message: "Students exported to College Google Sheet successfully"
    });

  } catch (error) {
    console.error("EXPORT COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export students"
    });
  }
};





export const getStudentsByCollegeId = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found"
      });
    }

    const users = await User.find({ collegeName: college.name }).select(
      "name email contactNumber university"
    );

    const enrichedData = await Promise.all(
      users.map(async (user) => {
        const registrations = await Registration.find({
          user: user._id
        }).populate("hackathon", "title");

        return {
          name: user.name,
          email: user.email,
          contactNumber: user.contactNumber,
          university: user.university,
          hackathons: registrations.map(
            (reg) => reg.hackathon?.title
          )
        };
      })
    );

    res.json({
      success: true,
      college: college.name,
      count: enrichedData.length,
      data: enrichedData
    });

  } catch (error) {
    console.error("ADMIN COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
};