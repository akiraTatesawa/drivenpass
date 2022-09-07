import { Credential } from "@prisma/client";
import { CredentialWithoutIdAndTimestamp } from "../entities/Credential";
import { prisma } from "../prisma";

export interface CredentialRepositoryInterface {
  insert: (credential: CredentialWithoutIdAndTimestamp) => Promise<void>;
  findAll: (userId: number) => Promise<Credential[]>;
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

  async findAll(userId: number): Promise<Credential[]> {
    return prisma.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number): Promise<Credential | null> {
    return prisma.credential.findUnique({
      where: {
        id,
      },
    });
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
