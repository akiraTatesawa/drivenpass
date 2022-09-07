import { Credential } from "@prisma/client";
import { CredentialWithoutIdAndTimestamp } from "../entities/Credential";
import { prisma } from "../prisma";

export interface CredentialRepositoryInterface {
  insert: (credential: CredentialWithoutIdAndTimestamp) => Promise<void>;
  findById: (id: number) => Promise<Credential | null>;
  findByUserIdAndTitle: (
    userId: number,
    title: string
  ) => Promise<Credential | null>;
}

export class CredentialRepository implements CredentialRepositoryInterface {
  async insert(credential: CredentialWithoutIdAndTimestamp): Promise<void> {
    await prisma.credential.create({
      data: credential,
    });
  }

  async findById(id: number): Promise<Credential | null> {
    const credential = await prisma.credential.findUnique({
      where: {
        id,
      },
    });

    return credential;
  }

  async findByUserIdAndTitle(
    userId: number,
    title: string
  ): Promise<Credential | null> {
    const credential = await prisma.credential.findUnique({
      where: {
        userId_title: {
          userId,
          title,
        },
      },
    });

    return credential;
  }
}
