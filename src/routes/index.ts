import { Router } from "express";
import { userRouter } from "./userRoute";

export const serverRouter = Router();

serverRouter.use(userRouter);
