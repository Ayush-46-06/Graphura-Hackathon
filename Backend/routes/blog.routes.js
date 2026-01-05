import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById
} from "../controllers/blog.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createBlogSchema, updateBlogSchema } from "../validators/blog.validator.js";
import { ROLES } from "../config/roles.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();


router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);


router.post(
  "/blog",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(createBlogSchema),
  upload.single("image"),
  createBlog
);

router.put(
  "/blog/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateBody(updateBlogSchema),
  upload.single("image"),
  updateBlog
);

router.delete(
  "/blog/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteBlog
);

export default router;
