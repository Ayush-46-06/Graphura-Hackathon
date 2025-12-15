import joi from "joi";

export const generateCertificateSchema = joi.object({
  hackathonId: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "any.required": "Hackathon ID is required",
      "string.hex": "Invalid Hackathon ID",
      "string.length": "Invalid Hackathon ID"
    }),

  certificateUrl: joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Invalid certificate URL",
      "any.required": "Certificate URL is required"
    })
});
