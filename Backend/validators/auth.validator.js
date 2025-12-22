import joi from "joi"

export const registerSchema = joi.object({
  name: joi.string().trim().min(1).required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
  address: joi.string().min(1).required(),
  contactNumber: joi.string().min(10).max(15).required(),
  university: joi.string().trim().required(),
  college: joi.string().required(),
  role: joi.string().valid("user", "admin").optional(),
  adminSecret: joi.string().optional() 
});


export const loginSchema = joi.object({
  email: joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Valid email is required",
      "any.required": "Email is required"
    }),

  password: joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password length must be at least 6 characters long",
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
    address: joi.string().required().messages({
      "any.required":"Address is required"
    }),
    contactNumber: joi.string()
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.min": "Contact number must be at least 10 digits",
      "string.max": "Contact number must not exceed 15 digits",
      "any.required": "Contact number is required"
    }),
    university: joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "University is required"
    }),

  college: joi.string().min(1).required().messages({
    "any.required": "College is required"
  })
})