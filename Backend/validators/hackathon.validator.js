import joi from "joi";

export const createHackathonSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().optional(),
  prizePool: joi.number().required(),
  category: joi.string().required(),
  tags: joi.array().items(joi.string()).required(),
  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref("startDate")).required(),
  status: joi.string().valid("upcoming", "ongoing", "completed").required(),
});



export const updateHackathonSchema = joi.object({
  title: joi.string().trim(),
  description: joi.string(),
  image: joi.string().uri(),
  prizePool: joi.number().positive(),
  category: joi.string().valid("coding", "design", "ai", "blockchain", "general"),
  tags: joi.array().items(joi.string()),
  startDate: joi.date(),
  endDate: joi.date(),
  status: joi.string().valid("upcoming", "ongoing", "completed")
});
