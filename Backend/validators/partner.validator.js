import joi from "joi";

export const partnerSchema = joi.object({
  firstName: joi.string().min(2).required(),
  lastName: joi.string().min(2).required(),
  workEmail: joi.string().email().required(),
  companyHQ: joi.string().required(),
  message: joi.string().min(5).required()
});