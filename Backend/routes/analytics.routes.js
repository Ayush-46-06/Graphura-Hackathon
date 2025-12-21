import express from "express";
import {
  hackathonGraphData,
  transactionStats
} from "../controllers/analytics.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateQuery } from "../middlewares/validate.middleware.js";
import { dashboardFilterSchema } from "../validators/analytics.validation.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN));

router.get(
  "/hackathons",
  validateQuery(dashboardFilterSchema),
  hackathonGraphData
);

router.get("/transactions", transactionStats);

export default router;
