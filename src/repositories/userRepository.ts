import { User } from "@prisma/client";
import { prisma } from "../prisma";

export interface UserRepositoryInterface {
  insert: (email: string, password: string) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
}

export class UserRepository implements UserRepositoryInterface {
  async insert(email: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
