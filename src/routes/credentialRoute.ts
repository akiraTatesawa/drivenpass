import { Router } from "express";
import { createCredential } from "../controllers/credentialControllers";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";

export const credentialRoute = Router();

credentialRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("credential"),
  createCredential
);

credentialRoute.get("/");
credentialRoute.get("/:credentialId");
credentialRoute.delete("/:credentialId");
