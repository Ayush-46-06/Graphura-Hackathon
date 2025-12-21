import express from "express"
import { createHackathon,updateHackathon,deleteHackathon,getAllHackathons,getHackathonById} from "../controllers/hackathon.controller.js";
import { createHackathonSchema,updateHackathonSchema } from "../validators/hackathon.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ROLES } from "../config/roles.js";
import { registerForHackathon } from "../controllers/registration.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js"
import {validateBody} from "../middlewares/validate.middleware.js"
import { registerHackathonSchema} from "../validators/registration.validator.js"
import upload from "../middlewares/upload.middleware.js";
const router = express.Router()

router.get("/",getAllHackathons)
router.get("/:id",getHackathonById)



router.post("/",authMiddleware,roleMiddleware(ROLES.ADMIN),upload.single("image"),validateBody(createHackathonSchema),createHackathon);
;
router.put("/:id",authMiddleware,roleMiddleware(ROLES.ADMIN),validateBody(updateHackathonSchema),updateHackathon);
router.delete("/:id",authMiddleware,roleMiddleware(ROLES.ADMIN),deleteHackathon)

router.post("/register",authMiddleware,validateBody(registerHackathonSchema),registerForHackathon)
export default router