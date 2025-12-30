import express from "express";
import {
  addComment,
  updateComment,
  deleteComment,
  getHackathonComments
} from "../controllers/comment.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateParams, validateBody } from "../middlewares/validate.middleware.js";

import {
  addCommentSchema,
  updateCommentSchema,
  hackathonIdParamSchema,
  commentIdParamSchema
} from "../validators/comment.validator.js";

const router = express.Router();

router.get(
  "/comment/:hackathonId",
  validateParams(hackathonIdParamSchema),
  getHackathonComments
);

router.post(
  "/comment",
  authMiddleware,
  validateBody(addCommentSchema),
  addComment
);


router.put(
  "/comment/:commentId",
  authMiddleware,
  validateParams(commentIdParamSchema),
  validateBody(updateCommentSchema),
  updateComment
);


router.delete(
  "/comment/:commentId",
  authMiddleware,
  validateParams(commentIdParamSchema),
  deleteComment
);

export default router;
