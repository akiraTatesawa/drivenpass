import { Router } from "express";
import { credentialRoute } from "./credentialRoute";
import { userRouter } from "./userRoute";

export const serverRouter = Router();

serverRouter.use(userRouter);
serverRouter.use("/credentials", credentialRoute);
