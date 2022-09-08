import { Request, Response } from "express";
import { ReqWifi } from "../@types/wifiTypes";
import {
  createWifiService,
  listAllWifiService,
} from "../services/wifiServices.ts";

export async function createWifi(
  req: Request<{}, {}, ReqWifi>,
  res: Response<{}, { userId: number }>
) {
  await createWifiService.create({ ...req.body, userId: res.locals.userId });

  return res.sendStatus(201);
}

export async function listAllWifi(
  req: Request,
  res: Response<{}, { userId: number }>
) {
  const wifiList = await listAllWifiService.listAll(res.locals.userId);

  return res.send(wifiList);
}

export async function listOneWifi(
  req: Request<{ wifiId: string }>,
  res: Response<{}, { userId: number }>
) {
  return res.send();
}

export async function deleteWifi(
  req: Request<{ wifiId: string }>,
  res: Response<{}, { userId: number }>
) {
  return res.sendStatus(204);
}
