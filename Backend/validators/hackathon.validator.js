import joi from "joi";

export const createHackathonSchema = joi.object({
  title: joi.string().trim().required(),

  description: joi.string().required(),

  about: joi.string().optional(),

  image: joi.string().optional(),

  prizePool: joi.number().positive().required(),

  prizeDetails: joi.string().optional(),

  category: joi.string()
    .valid(
      "Coding",
      "Design",
      "AI/ML",
      "Blockchain",
      "Web Development",
      "Mobile Apps"
    )
    .required(),

  tags: joi.alternatives().try(
    joi.array().items(joi.string()),
    joi.string()
  ).optional(),

  sponsors: joi.alternatives().try(
    joi.array().items(joi.string()),
    joi.string()
  ).optional(),

  judges: joi.alternatives().try(
    joi.array().items(
      joi.string().hex().length(24)
    ),
    joi.string()
  ).optional(),

  startDate: joi.date().required(),

  endDate: joi.date()
    .greater(joi.ref("startDate"))
    .required(),

  lastEnrollmentDate: joi.date()
    .less(joi.ref("startDate"))
    .optional(),

  status: joi.string()
    .valid("upcoming", "ongoing", "completed")
    .required()
});


export const updateHackathonSchema = joi.object({
  title: joi.string().trim(),

  description: joi.string(),

  about: joi.string(),

  image: joi.string(),

  prizePool: joi.number().positive(),

  prizeDetails: joi.string(),

  category: joi.string().valid(
    "Coding",
    "Design",
    "AI/ML",
    "Blockchain",
    "Web Development",
    "Mobile Apps"
  ),

  tags: joi.array().items(joi.string()),

  sponsors: joi.array().items(joi.string()),

  judges: joi.array().items(
    joi.string().hex().length(24)
  ),

  startDate: joi.date(),

  endDate: joi.date(),

  lastEnrollmentDate: joi.date(),

  status: joi.string().valid("upcoming", "ongoing", "completed")
});
