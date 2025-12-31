import express from "express";
import {
  submitContactForm,
  subscribeNewsletter
} from "../controllers/contact.controller.js";

import {
  contactSchema,
  subscribeSchema
} from "../validators/contact.validator.js";

import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/contact",
  validateBody(contactSchema),
  submitContactForm
);


router.post(
  "/subscribe",
  validateBody(subscribeSchema),
  subscribeNewsletter
);

export default router;
