import { Card } from "@prisma/client";

export type CardWithoutIdAndTimestamp = Omit<Card, "id" | "createdAt">;
