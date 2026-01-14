import joi from "joi";

export const declareResultSchema = joi.object({
  hackathonId: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "any.required": "Hackathon ID is required",
      "string.hex": "Invalid Hackathon ID",
      "string.length": "Invalid Hackathon ID"
    })
});