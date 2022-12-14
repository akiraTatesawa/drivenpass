import { Router } from "express";
import { createUser, signIn } from "../controllers/userControllers";

import { validateBody } from "../middlewares/schemaMiddleware";

export const userRouter = Router();

userRouter.post("/sign-up", validateBody("user"), createUser);
userRouter.post("/sign-in", validateBody("user"), signIn);
