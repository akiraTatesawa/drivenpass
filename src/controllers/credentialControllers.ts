import { Request, Response } from "express";
import { CredentialWithoutIdAndTimestamp } from "../@types/credentialTypes";
import {
  listOneCredentialService,
  createCredentialService,
  deleteCredentialService,
  listAllCredentialsService,
} from "../services/credentialServices/index";

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
  const credential = await listOneCredentialService.list(
    res.locals.userId,
    parseInt(req.params.credentialId, 10)
  );

  return res.send(credential);
}

export async function deleteCredential(
  req: Request<{ credentialId: string }>,
  res: Response<{}, { userId: number }>
) {
  await deleteCredentialService.delete(
    parseInt(req.params.credentialId, 10),
    res.locals.userId
  );

  return res.sendStatus(204);
}
