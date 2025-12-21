import express from "express";
import {createBlog,updateBlog,deleteBlog,getAllBlogs,getBlogById} from "../controllers/blog.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {createBlogSchema,updateBlogSchema} from "../validators/blog.validator.js";
import { ROLES } from "../config/roles.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);


router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.single("image"),     
  validateBody(createBlogSchema),
  createBlog
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.single("image"),
  validateBody(updateBlogSchema),
  updateBlog
);

router.delete("/:id",authMiddleware,roleMiddleware(ROLES.ADMIN),deleteBlog);

export default router;
