import joi from "joi"



export const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  address: joi.string().required(),
  contactNumber: joi.string().min(10).max(15).required(),
  university: joi.string().required(),

  collegeUniqueId: joi.string().required(), // ✅ IMPORTANT

  occupation: joi.string().optional(),
  company: joi.string().optional(),
  role: joi.string().valid("user", "admin").optional(),
  adminSecret: joi.string().optional(),
  courseName: joi.string().optional(),
  yearOfStudy: joi.string().optional()
});

export const loginSchema = joi.object({
  email: joi.string().required().messages({
    "any.required": "Email or College ID is required"
  }),
  password: joi.string().required().messages({
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