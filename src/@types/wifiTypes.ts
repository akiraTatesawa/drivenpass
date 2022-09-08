import { Wifi } from "@prisma/client";

export type WifiWithoutIdAndTimestamp = Omit<Wifi, "id" | "createdAt">;

export type ReqWifi = Omit<Wifi, "id" | "userId" | "createdAt">;

export interface WifiDecrypted {
  id: number;
  userId: number;
  title: string;
  wifiName: string;
  password: string;
  createdAt: string;
}
