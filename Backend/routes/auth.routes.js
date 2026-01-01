import express from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { register, login, forgotPassword,resetPassword } from "../controllers/auth.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/auth/register",
  upload.single("image"),
  register
);

router.post(
  "/auth/login",
  validateBody(loginSchema),
  login
);

router.post("/auth/forgot-password",forgotPassword)

router.post("/auth/reset-password/:token",resetPassword)

export default router;
