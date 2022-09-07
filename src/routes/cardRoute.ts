import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";
import * as cardControllers from "../controllers/cardController";

export const cardRoute = Router();

cardRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("card"),
  cardControllers.createCard
);

cardRoute.get("/", tokenValidationMiddleware, cardControllers.listAllCards);

cardRoute.get("/:cardId", tokenValidationMiddleware);

cardRoute.delete("/:cardId", tokenValidationMiddleware);
