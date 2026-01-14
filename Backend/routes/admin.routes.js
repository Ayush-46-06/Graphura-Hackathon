import express from "express";
import {
  getAllUsers,
  declareHackathonResult,
  exportStudentsToSheet
} from "../controllers/admin.controller.js";

import {
  adminDashboardOverview,
  hackathonGraphData,
  transactionStats
} from "../controllers/analytics.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody, validateQuery } from "../middlewares/validate.middleware.js";

import { declareResultSchema } from "../validators/result.validator.js";
import { dashboardFilterSchema } from "../validators/analytics.validation.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

/* ================= DASHBOARD ================= */
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  adminDashboardOverview
);

router.get(
  "/admin/dashboard/graph",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateQuery(dashboardFilterSchema),
  hackathonGraphData
);

router.get(
  "/admin/dashboard/transactions",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  transactionStats
);

/* ================= USERS ================= */
router.get(
  "/admin/users",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllUsers
);

/* ================= HACKATHON RESULT ================= */
router.post(
  "/admin/hackathon/declare-result",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(declareResultSchema),
  declareHackathonResult
);

/* ================= EXPORT ================= */
router.post(
  "/admin/export/students",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  exportStudentsToSheet
);

export default router;