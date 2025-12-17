import express from "express";
import {getProfile,updateProfile,myHackathons,downloadCertificate} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateProfileSchema } from "../validator/auth.validator.js";
import { validateBody } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware,validateBody(updateProfileSchema),updateProfile);
router.get("/hackathons", authMiddleware, myHackathons);
router.get("/certificate/:hackathonId",authMiddleware,downloadCertificate);

export default router;
