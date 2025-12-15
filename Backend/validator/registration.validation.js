import joi from "joi"

export const registerHackathonSchema = joi.object({
  hackathonId: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "any.required": "Hackathon ID is required",
      "string.length": "Invalid Hackathon ID",
      "string.hex": "Invalid Hackathon ID"
    })
});
