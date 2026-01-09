import joi from "joi"

export const registerSchema = joi.object({
  name: joi.string()
    .trim()
    .min(2)
    .required()
    .messages({
      "string.min": "Name must be at least 2 characters",
      "any.required": "Name is required"
    }),

  email: joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required"
    }),

  password: joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "any.required": "Password is required"
    }),

  address: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Address is required"
    }),

  contactNumber: joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be 10–15 digits",
      "any.required": "Contact number is required"
    }),

  university: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "University is required"
    }),

  // ✅ College name instead of uniqueId
  collegeName: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "College name is required"
    }),

  occupation: joi.string().optional().allow(null, ""),
  company: joi.string().optional().allow(null, ""),

  role: joi.string()
    .valid("user", "admin")
    .optional(),

  adminSecret: joi.string().optional(),

  courseName: joi.string().optional().allow(null, ""),
  yearOfStudy: joi.string().optional().allow(null, "")
});

export const loginSchema = joi.object({
  email: joi.string()
    .required()
    .messages({
      "any.required": "Email is required"
    }),

  password: joi.string()
    .required()
    .messages({
      "any.required": "Password is required"
    })
});



export const updateProfileSchema = joi.object({
  name: joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.min": "Name is required",
      "any.required": "Name is required"
    }),

  address: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Address is required"
    }),

  contactNumber: joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be 10–15 digits",
      "any.required": "Contact number is required"
    }),

  university: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "University is required"
    }),

  collegeName: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "College name is required"
    }),

  courseName: joi.string()
    .trim()
    .optional()
    .allow(null, ""),

  yearOfStudy: joi.string()
    .trim()
    .optional()
    .allow(null, "")
})
.options({ allowUnknown: true });