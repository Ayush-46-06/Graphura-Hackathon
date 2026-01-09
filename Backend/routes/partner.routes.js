import express from "express";
import { applyPartner } from "../controllers/partner.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { partnerSchema } from "../validators/partner.validator.js";

const router = express.Router();

router.post(
  "/partner/apply",
  validateBody(partnerSchema),
  applyPartner
);

export default router;