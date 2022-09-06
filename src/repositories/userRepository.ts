import { User } from "@prisma/client";
import { prisma } from "../prisma";

export interface UserRepositoryInterface {
  insert: (email: string, password: string) => Promise<void>;
  find: (email: string, password: string) => Promise<User | null>;
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

  async find(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    return user;
  }
}
