import express from "express";
import {
  createHackathon,
  updateHackathon,
  deleteHackathon,
  getAllHackathons,
  getHackathonById
} from "../controllers/hackathon.controller.js";

import {
  registerForHackathon,
  getParticipantsCount,
  getParticipantsList
} from "../controllers/registration.controller.js";

import {
  createHackathonSchema,
  updateHackathonSchema
} from "../validators/hackathon.validator.js";

import { registerHackathonSchema } from "../validators/registration.validator.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();


router.get("/", getAllHackathons);
router.get("/:id", getHackathonById);


router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "sponsors", maxCount: 10 }
  ]),
  validateBody(createHackathonSchema),
  createHackathon
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(updateHackathonSchema),
  updateHackathon
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteHackathon
);


router.post(
  "/register",
  authMiddleware,
  validateBody(registerHackathonSchema),
  registerForHackathon
);


router.get(
  "/:hackathonId/participants/count",
  getParticipantsCount
);

router.get(
  "/:hackathonId/participants",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getParticipantsList
);

export default router;