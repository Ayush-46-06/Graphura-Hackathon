import express from "express";

/* ================= CONTROLLERS ================= */
import {
  createHackathon,
  updateHackathon,
  deleteHackathon,
  getAllHackathons,
  getHackathonById,
  uploadActivityPdf
} from "../controllers/hackathon.controller.js";

import {
  registerForHackathon,
  getParticipantsCount,
  getParticipantsList,
  createPaidOrder,
  verifyPaidRegistration,
  createTeamRegistration,
  addTeamMember,
  submitHackathonProject
} from "../controllers/registration.controller.js";

/* ================= VALIDATORS ================= */
import {
  createHackathonSchema,
  updateHackathonSchema
} from "../validators/hackathon.validator.js";

import { registerHackathonSchema } from "../validators/registration.validator.js";

/* ================= MIDDLEWARES ================= */
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";


import { ROLES } from "../config/roles.js";

const router = express.Router();



router.get("/hackathon", getAllHackathons);

router.get("/hackathon/:id", getHackathonById);


router.post(
  "/hackathon",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(createHackathonSchema),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "sponsors", maxCount: 10 },
    { name: "activityPdf", maxCount: 1 }
  ]),
  createHackathon
);

router.put(
  "/hackathon/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(updateHackathonSchema),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "sponsors", maxCount: 10 }
  ]),
  updateHackathon
);

router.delete(
  "/hackathon/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteHackathon
);


router.post(
  "/hackathon/register",
  authMiddleware,
  roleMiddleware(ROLES.USER),
  validateBody(registerHackathonSchema),
  registerForHackathon
);


router.post(
  "/hackathon/register/paid/create-order",
  authMiddleware,
  createPaidOrder
);

router.post(
  "/hackathon/register/paid/verify",
  authMiddleware,
  verifyPaidRegistration
);


router.post(
  "/hackathon/register/team/create",
  authMiddleware,
  validateBody(registerHackathonSchema),
  createTeamRegistration
);

router.post(
  "/hackathon/register/team/add-member",
  authMiddleware,
  addTeamMember
);



router.get(
  "/hackathon/:hackathonId/participants/count",
  getParticipantsCount
);

router.get(
  "/hackathon/:hackathonId/participants",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getParticipantsList
);


router.post(
  "/hackathon/:id/activity-pdf",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.single("activityPdf"),
  uploadActivityPdf
);

router.post(
  "/hackathon/:hackathonId/submit",
  authMiddleware,
  roleMiddleware(ROLES.USER),
  submitHackathonProject
);
export default router;