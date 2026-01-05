import express from "express";
import { sponsorInterest } from "../controllers/sponsorInterest.controller.js";

const router = express.Router();

router.post("/sponsor-interest", sponsorInterest);

export default router;
