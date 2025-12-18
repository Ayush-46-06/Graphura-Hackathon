
import express from "express"
import { registerSchema,loginSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { register,login } from "../controllers/auth.controller.js";


const router = express.Router()

router.post("/register",validateBody(registerSchema),register)
router.get("/login",validateBody(loginSchema),login)

export default router