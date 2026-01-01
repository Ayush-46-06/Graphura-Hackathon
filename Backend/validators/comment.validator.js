import joi from "joi";

export const addCommentSchema = joi.object({
  hackathonId: joi
    .string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.base": "Hackathon ID must be a string",
      "string.hex": "Invalid Hackathon ID",
      "string.length": "Invalid Hackathon ID",
      "any.required": "Hackathon ID is required"
    }),

  text: joi
    .string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Comment text is required",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 1000 characters"
    }),

  // 👇 optional → only for reply
  parentCommentId: joi
    .string()
    .hex()
    .length(24)
    .optional()
    .allow(null)
    .messages({
      "string.hex": "Invalid parent comment ID",
      "string.length": "Invalid parent comment ID"
    })
});


export const updateCommentSchema = joi.object({
  text: joi
    .string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Updated comment text is required",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 1000 characters"
    })
});


export const commentIdParamSchema = joi.object({
  commentId: joi
    .string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid comment ID",
      "string.length": "Invalid comment ID"
    })
});

export const hackathonIdParamSchema = joi.object({
  hackathonId: joi
    .string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid hackathon ID",
      "string.length": "Invalid hackathon ID"
    })
});
