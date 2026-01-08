import express from "express";
import {getProfile,updateProfile,myHackathons,downloadCertificate} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfileSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import User from "../models/User.model.js"
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/user/profile", authMiddleware, getProfile);

router.put(
  "/user/profile",
  authMiddleware,
  upload.single("image"),         
  validateBody(updateProfileSchema),
  updateProfile
);
router.get("/user/hackathons", authMiddleware, myHackathons);
router.get(
  "/user/certificate/:hackathonId",
  authMiddleware,
  downloadCertificate
);
router.get("/user/wallet", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select("wallet");
  res.json({
    success: true,
    data: { wallet: user.wallet }
  });
});

export default router;
