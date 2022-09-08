import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";

export const wifiRoute = Router();

wifiRoute.post("/", tokenValidationMiddleware, validateBody("wifi"));

wifiRoute.get("/", tokenValidationMiddleware);

wifiRoute.get("/:wifiId", tokenValidationMiddleware);

wifiRoute.delete("/:wifiId", tokenValidationMiddleware);
