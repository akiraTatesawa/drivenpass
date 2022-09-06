import { Request, Response } from "express";
import { createUserService, signInUserService } from "../services/userServices";

export interface UserBody {
  email: string;
  password: string;
}

export async function createUser(
  req: Request<{}, {}, UserBody>,
  res: Response
) {
  const { email, password } = req.body;

  await createUserService.create(email.trim(), password);

  return res.sendStatus(201);
}

export async function signIn(req: Request<{}, {}, UserBody>, res: Response) {
  const { email, password } = req.body;

  const token = await signInUserService.signIn(email, password);

  return res.status(200).json({ token });
}
