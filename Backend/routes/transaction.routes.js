import express from "express"
import { createTransaction, updateTransactionStatus, getAllTransactions, getMyTransactions} from "../controllers/transaction.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js"
import { ROLES } from "../config/roles.js"
import { createTransactionSchema,updateTransactionSchema } from "../validators/transaction.validator.js"
import { validateBody } from "../middlewares/validate.middleware.js"

const router = express.Router()
router.post("/",authMiddleware,validateBody(createTransactionSchema),createTransaction);

router.get("/",authMiddleware,roleMiddleware(ROLES.ADMIN),getAllTransactions)
router.put("/:id",authMiddleware,roleMiddleware(ROLES.ADMIN),validateBody(updateTransactionSchema),updateTransactionStatus)
router.get("/me",authMiddleware,getMyTransactions)
export default router