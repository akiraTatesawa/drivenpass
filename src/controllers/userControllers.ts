import { Request, Response } from "express";
import { createUserService } from "../services/userServices";

export interface CreateUserBody {
  email: string;
  password: string;
}

export async function createUser(
  req: Request<{}, {}, CreateUserBody>,
  res: Response
) {
  const { email, password } = req.body;

  await createUserService.create(email.trim(), password);

  return res.sendStatus(201);
}
