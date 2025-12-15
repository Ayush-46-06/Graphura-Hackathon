import joi from "joi";

export const createHackathonSchema = joi.object({
  title: joi.string().trim().required().messages({
    "any.required": "Hackathon title is required",
  }),

  description: joi.string().trim().required(),

  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref("startDate")).required(),

  status: joi
    .string()
    .valid("upcoming", "ongoing", "completed")
    .default("upcoming"),
});

export const updateHackathonSchema = joi.object({
  title: joi.string().trim(),
  description: joi.string().trim(),
  startDate: joi.date(),
  endDate: joi.date(),
  status: joi.string().valid("upcoming", "ongoing", "completed"),
});
