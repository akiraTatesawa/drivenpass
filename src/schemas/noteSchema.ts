import Joi from "joi";

export const noteSchema = Joi.object({
  title: Joi.string().max(50).trim().required(),
  text: Joi.string().max(1000).trim().required(),
});
