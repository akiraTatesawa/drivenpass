import { Credential } from "@prisma/client";
import { CredentialWithoutIdAndTimestamp } from "../@types/credentialTypes";
import { prisma } from "../prisma";
import { IRepository } from "../@types/repositoryTypes";

export interface CredentialRepositoryInterface
  extends IRepository<CredentialWithoutIdAndTimestamp, Credential> {}

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
    title: string,
    userId: number
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

  async delete(id: number): Promise<void> {
    await prisma.credential.delete({
      where: {
        id,
      },
    });
  }
}
