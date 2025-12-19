import express from "express";
import {getProfile,updateProfile,myHackathons,downloadCertificate} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfileSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware,validateBody(updateProfileSchema),updateProfile);
router.get("/hackathons", authMiddleware, myHackathons);
router.get(
  "/certificate/:hackathonId",
  authMiddleware,
  downloadCertificate
);

export default router;
