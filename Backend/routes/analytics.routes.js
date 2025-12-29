import express from "express";
import {
  adminDashboardOverview,
  registrationGrowth,
  registrationCompletion,
  hackathonGraphData,
  transactionStats,
  allTransactions,
  hackathonDetailsAdmin,
  userDashboardOverview,
  suggestedHackathons
} from "../controllers/analytics.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateQuery } from "../middlewares/validate.middleware.js";
import { dashboardFilterSchema } from "../validators/analytics.validation.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();



router.use(authMiddleware);

router.get(
  "/analytics/admin/overview",
  roleMiddleware(ROLES.ADMIN),
  adminDashboardOverview
);

router.get(
  "/analytics/admin/registration-growth",
  roleMiddleware(ROLES.ADMIN),
  registrationGrowth
);

router.get(
  "/analytics/admin/registration-completion",
  roleMiddleware(ROLES.ADMIN),
  registrationCompletion
);

router.get(
  "/analytics/admin/hackathons-graph",
  roleMiddleware(ROLES.ADMIN),
  validateQuery(dashboardFilterSchema),
  hackathonGraphData
);

router.get(
  "/analytics/admin/transactions/stats",
  roleMiddleware(ROLES.ADMIN),
  transactionStats
);

router.get(
  "/analytics/admin/transactions",
  roleMiddleware(ROLES.ADMIN),
  allTransactions
);

router.get(
  "/analytics/admin/hackathons/details",
  roleMiddleware(ROLES.ADMIN),
  hackathonDetailsAdmin
);



router.get(
  "/analytics/user/overview",
  roleMiddleware(ROLES.USER),
  userDashboardOverview
);

router.get(
  "/analytics/user/suggestions",
  roleMiddleware(ROLES.USER),
  suggestedHackathons
);

export default router;