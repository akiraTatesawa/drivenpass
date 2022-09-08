import { Request, Response } from "express";
import { ReqWifi } from "../@types/wifiTypes";
import {
  deleteWifiService,
  listOneWifiService,
  createWifiService,
  listAllWifiService,
} from "../services/wifiServices.ts/index";

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
  const wifi = await listOneWifiService.list(
    res.locals.userId,
    parseInt(req.params.wifiId, 10)
  );

  return res.send(wifi);
}

export async function deleteWifi(
  req: Request<{ wifiId: string }>,
  res: Response<{}, { userId: number }>
) {
  await deleteWifiService.delete(
    res.locals.userId,
    parseInt(req.params.wifiId, 10)
  );

  return res.sendStatus(204);
}
