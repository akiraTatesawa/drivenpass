import { Request, Response } from "express";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import { createCardService } from "../services/cardServices";

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
