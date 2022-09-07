import { Request, Response } from "express";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import {
  deleteCardService,
  createCardService,
  listAllCardsService,
  listOneCardService,
} from "../services/cardServices/index";

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

export async function listCard(
  req: Request<{ cardId: string }>,
  res: Response<{}, { userId: number }>
) {
  const card = await listOneCardService.list(
    res.locals.userId,
    parseInt(req.params.cardId, 10)
  );

  return res.send(card);
}

export async function deleteCard(
  req: Request<{ cardId: string }>,
  res: Response<{}, { userId: number }>
) {
  await deleteCardService.delete(
    res.locals.userId,
    parseInt(req.params.cardId, 10)
  );

  return res.sendStatus(204);
}
