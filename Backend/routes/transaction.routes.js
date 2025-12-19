import express from "express";
import {
  createTransaction,
  updateTransactionStatus,
  getMyTransactions,
  getAllTransactions
} from "../controllers/transaction.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

import {
  createTransactionSchema,
  updateTransactionSchema
} from "../validators/transaction.validator.js";

import { ROLES } from "../config/roles.js";

const router = express.Router();


router.post("/",authMiddleware,validateBody(createTransactionSchema),createTransaction);

router.get("/me", authMiddleware, getMyTransactions);


router.get("/",authMiddleware,roleMiddleware(ROLES.ADMIN),getAllTransactions);

router.put("/:id",authMiddleware,roleMiddleware(ROLES.ADMIN),validateBody(updateTransactionSchema),updateTransactionStatus);

export default router;
