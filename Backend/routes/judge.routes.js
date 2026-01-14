import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../config/roles.js";

import {
  getAllHackathonsForJudge,
  getHackathonParticipantsForJudge,
  reviewAndRankParticipant
} from "../controllers/judge.controller.js";

const router = express.Router();

router.get(
  "/judge/hackathons",
  authMiddleware,
  roleMiddleware(ROLES.JUDGE),
  getAllHackathonsForJudge
);

router.get(
  "/judge/hackathon/:hackathonId/participants",
  authMiddleware,
  roleMiddleware(ROLES.JUDGE),
  getHackathonParticipantsForJudge
);

router.post(
  "/judge/hackathon/:hackathonId/review",
  authMiddleware,
  roleMiddleware(ROLES.JUDGE),
  reviewAndRankParticipant
);

export default router;