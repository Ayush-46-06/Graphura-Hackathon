import express from "express";

import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  getCollegeStudents,
  exportCollegeStudents,
  collegeLogin,
  getStudentsByCollegeId
} from "../controllers/college.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

/* ================= ADMIN COLLEGE MANAGEMENT ================= */

// Create college
router.post("/college/login", collegeLogin);

router.post(
  "/college",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createCollege
);

// Get all colleges
router.get(
  "/college",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllColleges
);

// Get college by ID
router.get(
  "/college/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getCollegeById
);

// Update college
router.put(
  "/college/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateCollege
);

/* ================= COLLEGE DASHBOARD (READ ONLY) ================= */

// College sees only its students
router.get(
  "/college/dashboard/students",
  authMiddleware,
  roleMiddleware(ROLES.COLLEGE),
  getCollegeStudents
);

// Export students to Google Sheet
router.get(
  "/college/dashboard/export",
  authMiddleware,
  roleMiddleware(ROLES.COLLEGE),
  exportCollegeStudents
);

// Admin → Click college → See students
router.get(
  "/college/:id/students",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getStudentsByCollegeId
);

export default router;