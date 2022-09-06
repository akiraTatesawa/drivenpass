import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: Joi.string().min(10).required(),
});
