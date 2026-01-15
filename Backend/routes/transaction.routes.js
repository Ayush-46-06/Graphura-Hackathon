import express from "express";
import {
  createTransaction,
  updateTransactionStatus,
  getMyTransactions,
  getAllTransactions
} from "../controllers/transaction.controller.js";
import { createTransactionSchema } from "../validators/transaction.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { ROLES } from "../config/roles.js";
import { updateTransactionSchema } from "../validators/transaction.validator.js";
const router = express.Router();

// ❌ User direct transaction create NOT allowed
router.post(
  "/transaction",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(createTransactionSchema),
  createTransaction
);

router.get("/transaction/me", authMiddleware, getMyTransactions);

router.get(
  "/transaction",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllTransactions
);

router.put(
  "/transaction/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(updateTransactionSchema),
  updateTransactionStatus
);

export default router;
