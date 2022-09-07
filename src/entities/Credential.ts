/* eslint-disable @typescript-eslint/indent */
import { Credential as CredentialDb } from "@prisma/client";

export type CredentialWithoutIdAndTimestamp = Omit<
  CredentialDb,
  "id" | "createdAt"
>;

export class Credential implements CredentialWithoutIdAndTimestamp {
  readonly userId: number;

  readonly title: string;

  readonly url: string;

  readonly username: string;

  readonly password: string;

  constructor({
    userId,
    title,
    url,
    username,
    password,
  }: CredentialWithoutIdAndTimestamp) {
    this.userId = userId;
    this.title = title;
    this.url = url;
    this.username = username;
    this.password = password;
  }
}
