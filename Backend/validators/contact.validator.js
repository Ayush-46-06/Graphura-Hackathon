import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  subject: Joi.string()
    .valid(
      "General Query",
      "Partnership",
      "Sponsorship",
      "Host a Hackathon",
      "Support"
    )
    .required(),
  message: Joi.string().min(1).required()
});

export const subscribeSchema = Joi.object({
  email: Joi.string().email().required()
});
