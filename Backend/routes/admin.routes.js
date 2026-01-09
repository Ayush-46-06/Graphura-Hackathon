import express from "express";
import {getAllUsers,declareHackathonResult,exportStudentsToSheet} from "../controllers/admin.controller.js";

import {adminDashboardOverview,hackathonGraphData,transactionStats} from "../controllers/analytics.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody, validateQuery } from "../middlewares/validate.middleware.js";

import { declareResultSchema } from "../validators/result.validator.js";
import { dashboardFilterSchema } from "../validators/analytics.validation.js";

import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN));

router.get("/admin/dashboard", adminDashboardOverview);
router.get("/admin/dashboard/graph",validateQuery(dashboardFilterSchema),hackathonGraphData);
router.get("/admin/dashboard/transactions", transactionStats);


router.get("/admin/users", getAllUsers);

router.post("/admin/hackathon/declare-result",validateBody(declareResultSchema),declareHackathonResult);


router.post("/admin/export/students", exportStudentsToSheet);

export default router;