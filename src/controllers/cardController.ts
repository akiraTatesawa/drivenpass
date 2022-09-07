import { Request, Response } from "express";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import {
  createCardService,
  listAllCardsService,
} from "../services/cardServices";

export async function createCard(
  req: Request<{}, {}, CardWithoutIdAndTimestamp>,
  res: Response<{}, { userId: number }>
) {
  await createCardService.create({
    ...req.body,
    userId: res.locals.userId,
  });

  return res.sendStatus(201);
}

export async function listAllCards(
  _req: Request,
  res: Response<{}, { userId: number }>
) {
  const cards = await listAllCardsService.listAll(res.locals.userId);

  return res.send(cards);
}
