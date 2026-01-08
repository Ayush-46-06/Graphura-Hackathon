import express from "express";


import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege
} from "../controllers/college.controller.js";


import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();


router.post(
  "/college",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createCollege
);


router.get(
  "/college",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllColleges
);


router.get(
  "/college/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getCollegeById
);


router.put(
  "/college/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateCollege
);



export default router;