import { Request, Response } from "express";
import { CredentialWithoutIdAndTimestamp } from "../entities/Credential";
import {
  createCredentialService,
  listAllCredentialsService,
} from "../services/credentialServices";

export async function createCredential(
  req: Request<{}, {}, CredentialWithoutIdAndTimestamp>,
  res: Response<{}, { userId: number }>
) {
  await createCredentialService.create(req.body, res.locals.userId);

  return res.sendStatus(201);
}

export async function listAllCredentials(
  req: Request,
  res: Response<{}, { userId: number }>
) {
  const credentials = await listAllCredentialsService.listAll(
    res.locals.userId
  );

  return res.send(credentials);
}
