import { Request, Response } from "express";
import { CredentialWithoutIdAndTimestamp } from "../entities/Credential";
import {
  createCredentialService,
  listAllCredentialsService,
  listOneCredential,
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

export async function listCredential(
  req: Request<{ credentialId: string }>,
  res: Response<{}, { userId: number }>
) {
  const credential = await listOneCredential.list(
    res.locals.userId,
    parseInt(req.params.credentialId, 10)
  );

  return res.send(credential);
}
