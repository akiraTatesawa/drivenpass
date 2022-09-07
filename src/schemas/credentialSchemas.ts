import Joi from "joi";

export const credentialSchema = Joi.object({
  title: Joi.string().trim().required(),
  url: Joi.string().uri().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
});
