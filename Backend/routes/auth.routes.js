import express from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { register, login, adminLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);


router.post("/login", validateBody(loginSchema), login);


router.post("/admin/login", validateBody(loginSchema), adminLogin);

export default router;
