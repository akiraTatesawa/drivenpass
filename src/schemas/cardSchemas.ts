import Joi from "joi";

export const cardSchema = Joi.object({
  title: Joi.string().trim().required(),
  number: Joi.string()
    .pattern(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)
    .message(`"Card Number" must follow the ####-####-####-#### pattern`)
    .required(),
  cardholderName: Joi.string()
    .pattern(/^[\p{Lu}\p{Mark}\s]+$/u)
    .message(
      `"Cardholder Name" must only contain uppercase letters and whitespace`
    )
    .required(),
  securityCode: Joi.string()
    .length(3)
    .pattern(/^\d+$/)
    .message(`"CVC" must only contain numbers`)
    .required(),
  expirationDate: Joi.string()
    .length(5)
    .pattern(/^[0-9]{2}\/[0-9]{2}$/)
    .message(`"Expiration" date must follow the MM/YY format`)
    .required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "both").required(),
  password: Joi.string()
    .pattern(/^\d+$/)
    .message(`"password" must only contain numbers`)
    .required(),
});
