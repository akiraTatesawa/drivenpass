import { Card } from "@prisma/client";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import { prisma } from "../prisma";

export interface CardRepositoryInterface {
  insert(cardData: CardWithoutIdAndTimestamp): Promise<void>;
  findAll(userId: number): Promise<Card[]>;
  findByUserIdAndTitle(title: string, userId: number): Promise<Card | null>;
  findById(cardId: number): Promise<Card | null>;
  delete(cardId: number): Promise<void>;
}

export class CardRepository implements CardRepositoryInterface {
  async insert(cardData: CardWithoutIdAndTimestamp): Promise<void> {
    await prisma.card.create({
      data: cardData,
    });
  }

  async findAll(userId: number): Promise<Card[]> {
    return prisma.card.findMany({
      where: {
        userId,
      },
    });
  }

  async findByUserIdAndTitle(
    title: string,
    userId: number
  ): Promise<Card | null> {
    return prisma.card.findUnique({
      where: {
        userId_title: {
          userId,
          title,
        },
      },
    });
  }

  async findById(cardId: number): Promise<Card | null> {
    return prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });
  }

  async delete(cardId: number): Promise<void> {
    await prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }
}
