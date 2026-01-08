import College from "../models/College.model.js";


export const createCollege = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      uniqueId,
      city,
      state
    } = req.body;

    const exists = await College.findOne({
      $or: [{ email }, { uniqueId }]
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "College already exists"
      });
    }

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash(password, 10);

    const college = await College.create({
      name,
      email,
      password: hashedPassword,
      uniqueId,
      city,
      state
    });

    res.status(201).json({
      success: true,
      message: "College created successfully",
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


export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: colleges
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges"
    });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    const college = await College.findById(id).select("-password");

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found"
      });
    }

    res.json({
      success: true,
      data: college
    });

  } catch (error) {
    console.error("GET COLLEGE BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college"
    });
  }
};

/* ================= UPDATE COLLEGE ================= */
export const updateCollege = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      const bcrypt = await import("bcryptjs");
      updateData.password = await bcrypt.default.hash(updateData.password, 10);
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update college"
    });
  }
};

/* ================= DELETE COLLEGE ================= */
export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found"
      });
    }

    res.json({
      success: true,
      message: "College deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete college"
    });
  }
};