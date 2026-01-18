import College from "../models/College.model.js";
import User from "../models/User.model.js";
import Registration from "../models/Registration.model.js";
import bcrypt from "bcryptjs";
import { sendCollegeCredentialsMail } from "../services/mail.service.js";
import googleSheetService from "../services/googleSheet.service.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";


/* ================= COLLEGE LOGIN ================= */
export const collegeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    
    const normalizedEmail = email.toLowerCase();

    const college = await College.findOne({
      $or: [{ email: normalizedEmail }, { alternateEmail: normalizedEmail }],
    }).select("+password");

    if (!college || !college.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, college.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
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
      role: "college",
    });
  } catch (error) {
    console.error("COLLEGE LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const createCollege = async (req, res) => {
  try {
    const { name, email, password, city, state, alternateEmail, shortName } =
      req.body;

   
    const primaryEmail = email.toLowerCase();
    const altEmail = alternateEmail?.toLowerCase();

    const exists = await College.findOne({
      $or: [
        { email: primaryEmail },
        ...(altEmail ? [{ alternateEmail: altEmail }] : []),
        { name },
        ...(shortName ? [{ shortName }] : []),
      ],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "College already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const college = await College.create({
      name,
      email: primaryEmail,
      alternateEmail: altEmail,
      shortName,
      password: hashedPassword,
      city,
      state,
    });

    await sendCollegeCredentialsMail({
      collegeName: name,
      collegeEmail: primaryEmail,
      password,
      loginUrl: `${process.env.FRONTEND_URL}/college-login`,
    });

    if (altEmail) {
      await sendCollegeCredentialsMail({
        collegeName: name,
        collegeEmail: altEmail,
        password,
        loginUrl: `${process.env.FRONTEND_URL}/college-login`,
      });
    }

    res.status(201).json({
      success: true,
      message: "College created and credentials sent via email",
      data: college,
    });
  } catch (error) {
    console.error("CREATE COLLEGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create college",
    });
  }
};

export const getAllColleges = async (req, res) => {
  try {
    const { search = "", isActive } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { shortName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { alternateEmail: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const colleges = await College.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    console.error("GET ALL COLLEGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
    });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID",
      });
    }

    const college = await College.findById(id).select("-password");

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("GET COLLEGE BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college",
    });
  }
};

/* ================= UPDATE COLLEGE ================= */

export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID",
      });
    }

    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

  
    delete updateData.role;

    const college = await College.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.json({
      success: true,
      message: "College updated successfully",
      data: college,
    });
  } catch (error) {
    console.error("UPDATE COLLEGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update college",
    });
  }
};

/* ================= COLLEGE STUDENTS LIST ================= */
export const getCollegeStudents = async (req, res) => {
  try {
    const collegeName = req.college.name;


    const users = await User.find({ collegeName }).select(
      "_id name email contactNumber"
    );

    if (!users.length) {
      return res.json({
        success: true,
        count: 0,
        data: [],
      });
    }

    const userIds = users.map((u) => u._id);

  
    const registrations = await Registration.find({
      user: { $in: userIds },
    }).populate("hackathon", "title");

  
    const hackathonMap = {};

    registrations.forEach((reg) => {
      if (!reg.hackathon) return;

      const uid = reg.user.toString();
      if (!hackathonMap[uid]) hackathonMap[uid] = new Set();

      hackathonMap[uid].add(reg.hackathon.title);
    });

  
    const result = users.map((user) => ({
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      hackathons: Array.from(hackathonMap[user._id.toString()] || []),
    })); 

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college students",
    });
  }
};

/* ================= EXPORT TO GOOGLE SHEET ================= */
export const exportCollegeStudents = async (req, res) => {
  try {
    const collegeName = req.college.name;


    const users = await User.find({ collegeName }).select(
      "_id name email contactNumber university"
    );

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "No students found for this college",
      });
    }

    const userIds = users.map((u) => u._id);

   
    const registrations = await Registration.find({
      user: { $in: userIds },
    }).populate("hackathon", "title");

   
    const hackathonMap = {};

    registrations.forEach((reg) => {
      if (!reg.hackathon) return;

      const uid = reg.user.toString();
      if (!hackathonMap[uid]) hackathonMap[uid] = new Set();

      hackathonMap[uid].add(reg.hackathon.title);
    });

 
    const exportData = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Contact: user.contactNumber || "",
      University: user.university || "",
      Hackathons: Array.from(hackathonMap[user._id.toString()] || []).join(
        ", "
      ),
    }));


    await googleSheetService.exportCollegeUsers(exportData);

    console.log(`📊 College students exported: ${collegeName}`);

    res.json({
      success: true,
      message: "Students exported to College Google Sheet successfully",
      count: exportData.length,
    });
  } catch (error) {
    console.error("EXPORT COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export students",
    });
  }
};

export const getStudentsByCollegeId = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

   
    const users = await User.find({ collegeName: college.name }).select(
      "_id name email contactNumber university"
    );

    if (!users.length) {
      return res.json({
        success: true,
        college: college.name,
        count: 0,
        data: [],
      });
    }

    const userIds = users.map((u) => u._id);

    
    const registrations = await Registration.find({
      user: { $in: userIds },
    }).populate("hackathon", "title");

   
    const hackathonMap = {};

    registrations.forEach((reg) => {
      if (!reg.hackathon) return;

      const uid = reg.user.toString();
      if (!hackathonMap[uid]) hackathonMap[uid] = new Set();

      hackathonMap[uid].add(reg.hackathon.title);
    });


    const enrichedData = users.map((user) => ({
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber || "",
      university: user.university || "",
      hackathons: Array.from(hackathonMap[user._id.toString()] || []),
    }));

    res.json({
      success: true,
      college: college.name,
      count: enrichedData.length,
      data: enrichedData,
    });
  } catch (error) {
    console.error("ADMIN COLLEGE STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};
