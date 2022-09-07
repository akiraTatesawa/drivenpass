/* eslint-disable @typescript-eslint/indent */
import { Credential as CredentialDb } from "@prisma/client";

export type CredentialWithoutIdAndTimestamp = Omit<
  CredentialDb,
  "id" | "createdAt"
>;

export interface DecryptedCredential {
  id: number;
  userId: number;
  title: string;
  url: string;
  username: string;
  password: string;
  createdAt: string;
}
