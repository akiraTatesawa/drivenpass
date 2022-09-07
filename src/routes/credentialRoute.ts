import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";
import * as credentialControllers from "../controllers/credentialControllers";

export const credentialRoute = Router();

credentialRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("credential"),
  credentialControllers.createCredential
);

credentialRoute.get(
  "/",
  tokenValidationMiddleware,
  credentialControllers.listAllCredentials
);

credentialRoute.get("/:credentialId");
credentialRoute.delete("/:credentialId");
