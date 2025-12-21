import joi from "joi";

export const createBlogSchema = joi.object({
  title: joi.string().trim().required(),
  content: joi.string().trim().required(),
  category: joi.string().trim().required(),
  publishedAt: joi.date().optional()
});

export const updateBlogSchema = joi.object({
  title: joi.string().trim(),
  content: joi.string().trim(),
  category: joi.string().trim(),
  publishedAt: joi.date()
})
.min(1)
.messages({
  "object.min": "At least one field must be provided for update",
});
