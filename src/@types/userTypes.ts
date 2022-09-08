import { User } from "@prisma/client";

export type UserWithoutIdAndTimestamp = Omit<User, "id" | "createdAt">;
