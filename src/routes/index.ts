import { Router } from "express";
import { credentialRoute } from "./credentialRoute";
import { noteRoute } from "./noteRoute";
import { userRouter } from "./userRoute";
import { cardRoute } from "./cardRoute";
import { wifiRoute } from "./wifiRoute";

export const serverRouter = Router();

serverRouter.use(userRouter);
serverRouter.use("/credentials", credentialRoute);
serverRouter.use("/notes", noteRoute);
serverRouter.use("/cards", cardRoute);
serverRouter.use("/wi-fis", wifiRoute);
