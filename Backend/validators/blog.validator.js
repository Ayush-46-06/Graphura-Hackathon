import joi from "joi";

export const createBlogSchema = joi.object({
  title: joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Title is required",
      "any.required": "Title is required"
    }),

  content: joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Content is required",
      "any.required": "Content is required"
    })
});


export const updateBlogSchema = joi.object({
  title: joi.string()
    .trim()
    .messages({
      "string.empty": "Title cannot be empty"
    }),

  content: joi.string()
    .trim()
    .messages({
      "string.empty": "Content cannot be empty"
    })
})
.min(1) 
.messages({
  "object.min": "At least one field must be provided for update"
});
