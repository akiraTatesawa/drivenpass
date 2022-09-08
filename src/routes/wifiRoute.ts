import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware";
import * as wifiControllers from "../controllers/wifiController";

export const wifiRoute = Router();

wifiRoute.post(
  "/",
  tokenValidationMiddleware,
  validateBody("wifi"),
  wifiControllers.createWifi
);

wifiRoute.get("/", tokenValidationMiddleware, wifiControllers.listAllWifi);

wifiRoute.get(
  "/:wifiId",
  tokenValidationMiddleware,
  wifiControllers.listOneWifi
);

wifiRoute.delete(
  "/:wifiId",
  tokenValidationMiddleware,
  wifiControllers.deleteWifi
);
