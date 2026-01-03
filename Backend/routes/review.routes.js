import express from "express"
import { addReview, deleteReview, getAllReview, updateReview} from "../controllers/review.controller.js";
const router = express.Router()
import {authMiddleware} from "../middlewares/auth.middleware.js";

router.post("/review",authMiddleware,addReview)
router.get("/review",getAllReview)
router.delete("/review/:id",authMiddleware,deleteReview)
router.put("/review/:id",authMiddleware,updateReview)

export default router