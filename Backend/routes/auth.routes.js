import express from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { register, login } from "../controllers/auth.controller.js";
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

export default router;
