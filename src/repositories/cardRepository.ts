/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { Card } from "@prisma/client";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import { IRepository } from "../@types/repositoryTypes";
import { prisma } from "../prisma";

export interface CardRepositoryInterface
  extends IRepository<CardWithoutIdAndTimestamp, Card> {}

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
