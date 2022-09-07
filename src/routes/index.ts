import { Router } from "express";
import { credentialRoute } from "./credentialRoute";
import { noteRoute } from "./noteRoute";
import { userRouter } from "./userRoute";

export const serverRouter = Router();

serverRouter.use(userRouter);
serverRouter.use("/credentials", credentialRoute);
serverRouter.use("/notes", noteRoute);
