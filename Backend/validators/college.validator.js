// import joi from "joi";

// export const createCollegeSchema = joi.object({
//   name: joi.string()
//     .min(1)
//     .trim()
//     .messages({
//       "string.empty": "College name is required",
//       "any.required": "College name is required"
//     }),

//   uniqueId: joi.string()
//     .trim()
//     .required()
//     .messages({
//       "string.empty": "Unique ID is required",
//       "any.required": "Unique ID is required"
//     }),

//   city: joi.string().trim().allow(""),

//   state: joi.string().trim().allow("")
// });


// export const updateCollegeSchema = joi.object({
//   name: joi.string().min(1).trim().messages({
//     "string.empty": "College name cannot be empty"
//   }),

//   city: joi.string().trim().allow(""),
//   state: joi.string().trim().allow("")
// }).min(1)
// .messages({
//   "object.min": "At least one field must be provided for update"
// });
