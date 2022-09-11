/* eslint-disable @typescript-eslint/indent */
import { Wifi } from "@prisma/client";
import { WifiWithoutIdAndTimestamp } from "../@types/wifiTypes";
import { prisma } from "../prisma";
import { IRepository } from "../@types/repositoryTypes";

export interface WifiRepositoryInterface
  extends Omit<
    IRepository<WifiWithoutIdAndTimestamp, Wifi>,
    "findByUserIdAndTitle"
  > {}

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
