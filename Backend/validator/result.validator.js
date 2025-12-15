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
    }),

  winners: joi.array()
    .items(
      joi.string()
        .hex()
        .length(24)
        .messages({
          "string.hex": "Invalid winner ID",
          "string.length": "Invalid winner ID"
        })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Winners must be an array of user IDs",
      "array.min": "At least one winner is required",
      "any.required": "Winners field is required"
    })
});
