import Joi from "joi";

export const wifiSchema = Joi.object({
  title: Joi.string().trim().required(),
  wifiName: Joi.string().trim().required(),
  password: Joi.string().required(),
});
