import { Wifi } from "@prisma/client";
import { WifiWithoutIdAndTimestamp } from "../@types/wifiTypes";
import { prisma } from "../prisma";

export interface WifiRepositoryInterface {
  insert(wifiData: WifiWithoutIdAndTimestamp): Promise<void>;
  findAll(userId: number): Promise<Wifi[]>;
  findById(wifiId: number): Promise<Wifi | null>;
  delete(wifiId: number): Promise<void>;
}

export class WifiRepository implements WifiRepositoryInterface {
  async insert(wifiData: WifiWithoutIdAndTimestamp): Promise<void> {
    await prisma.wifi.create({
      data: wifiData,
    });
  }

  async findAll(userId: number): Promise<Wifi[]> {
    return prisma.wifi.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(wifiId: number): Promise<Wifi | null> {
    return prisma.wifi.findUnique({
      where: {
        id: wifiId,
      },
    });
  }

  async delete(wifiId: number): Promise<void> {
    await prisma.wifi.delete({
      where: {
        id: wifiId,
      },
    });
  }
}
