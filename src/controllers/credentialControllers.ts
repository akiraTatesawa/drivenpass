import { Request, Response } from "express";
import { CredentialWithoutIdAndTimestamp } from "../entities/Credential";
import { createCredentialService } from "../services/credentialServices";

export async function createCredential(
  req: Request<{}, {}, CredentialWithoutIdAndTimestamp>,
  res: Response<{}, { userId: number }>
) {
  await createCredentialService.create(req.body, res.locals.userId);

  return res.sendStatus(201);
}
