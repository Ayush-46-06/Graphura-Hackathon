import joi from "joi";

export const createBlogSchema = joi.object({
  title: joi.string().trim().min(1).required(),
  content: joi.string().trim().min(1).required(),
  category: joi.string().trim().min(1).required(),
  publishedAt: joi.date().optional()
}).options({ allowUnknown: false });


export const updateBlogSchema = joi.object({
  title: joi.string().trim().min(1),
  content: joi.string().trim().min(1),
  category: joi.string().trim().min(1),
  publishedAt: joi.date()
})
.min(1)
.options({ allowUnknown: false })
.messages({
  "object.min": "At least one field must be provided for update",
});
