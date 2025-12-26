import joi from "joi";

export const dashboardFilterSchema = joi.object({
  filter: joi
    .string()
    .valid("day", "month", "year")
    .optional()
    .default("month")
    .messages({
      "any.only": "Filter must be one of day, month, or year"
    })
});