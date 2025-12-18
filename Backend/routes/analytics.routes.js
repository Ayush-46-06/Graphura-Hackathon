import express from "express"
import {adminDashboardOverview,hackathonGraphData,transactionStats} from "../controllers/analytics.controller.js"
import {dashboardFilterSchema} from "../validators/analytics.validation.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { ROLES } from "../config/roles.js"
import { roleMiddleware } from "../middlewares/role.middleware.js"
import { validateBody } from "../middlewares/validate.middleware.js"

const router = express.Router()

router.get("/",authMiddleware,roleMiddleware(ROLES.ADMIN),validateBody(dashboardFilterSchema),adminDashboardOverview)

export default router