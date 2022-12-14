import { NextFunction, Request, Response } from "express";
import { userSchema as user } from "../schemas/userSchemas";
import { credentialSchema as credential } from "../schemas/credentialSchemas";
import { noteSchema as note } from "../schemas/noteSchema";
import { cardSchema as card } from "../schemas/cardSchemas";
import { wifiSchema as wifi } from "../schemas/wifiSchemas";
import { CustomError } from "../entities/CustomError";

const Schemas = {
  user,
  credential,
  note,
  card,
  wifi,
};

type Validator = keyof typeof Schemas;

export function validateBody(
  validator: Validator
): (req: Request, _res: Response, next: NextFunction) => Promise<void> {
  if (!Object.hasOwn(Schemas, validator)) {
    throw new CustomError(
      "error_internal_server_error",
      "Invalid schema validator"
    );
  }

  return async (req: Request, _res: Response, next: NextFunction) => {
    const { error } = Schemas[validator].validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join("; ");
      throw new CustomError("error_unprocessable_entity", message);
    }

    return next();
  };
}
