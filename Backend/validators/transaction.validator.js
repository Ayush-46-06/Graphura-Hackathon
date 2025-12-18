import joi from "joi";

export const createTransactionSchema = joi.object({
  hackathonId: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "any.required": "Hackathon ID is required",
      "string.length": "Invalid Hackathon ID",
      "string.hex": "Invalid Hackathon ID"
    }),

  amount: joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    })
});


export const updateTransactionSchema = joi.object({
  status: joi.string()
    .valid("success", "pending", "rejected")
    .required()
});

