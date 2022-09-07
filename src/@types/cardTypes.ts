import { Card, CardType } from "@prisma/client";

export type CardWithoutIdAndTimestamp = Omit<Card, "id" | "createdAt">;

export interface DecryptedCard {
  id: number;
  userId: number;
  title: string;
  number: string;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password: string;
  isVirtual: boolean;
  type: CardType;
  createdAt: string;
}
