import { User } from "@prisma/client";
import { UserWithoutIdAndTimestamp } from "../@types/userTypes";
import { prisma } from "../prisma";

export interface UserRepositoryInterface {
  insert(userData: UserWithoutIdAndTimestamp): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}

export class UserRepository implements UserRepositoryInterface {
  async insert(userData: UserWithoutIdAndTimestamp): Promise<void> {
    await prisma.user.create({
      data: userData,
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
