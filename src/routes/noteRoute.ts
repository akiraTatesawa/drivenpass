import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";
import * as noteController from "../controllers/noteController";

export const noteRoute = Router();

noteRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("note"),
  noteController.createNote
);

noteRoute.get("/", tokenValidationMiddleware, noteController.listAllNotes);

noteRoute.get("/:noteId", tokenValidationMiddleware);

noteRoute.delete("/:noteId", tokenValidationMiddleware);
