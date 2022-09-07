import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";

export const credentialRoute = Router();

credentialRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("credential")
);

credentialRoute.get("/");
credentialRoute.get("/:credentialId");
credentialRoute.delete("/:credentialId");
