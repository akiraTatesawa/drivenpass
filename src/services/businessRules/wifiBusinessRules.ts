import { Wifi } from "@prisma/client";
import { WifiRepositoryInterface } from "../../repositories/wifiRepository";
import { CustomError } from "../../entities/CustomError";

export interface WifiBusinessRulesInterface {
  validateWifiByIdOrFail(userId: number, wifiId: number): Promise<Wifi>;
}

export class WifiBusinessRules implements WifiBusinessRulesInterface {
  constructor(private wifiRepository: WifiRepositoryInterface) {
    this.wifiRepository = wifiRepository;
  }

  async validateWifiByIdOrFail(userId: number, wifiId: number): Promise<Wifi> {
    if (!wifiId) {
      throw new CustomError("error_bad_request", "Wifi ID must be a number");
    }

    const wifi = await this.wifiRepository.findById(wifiId);

    if (!wifi) {
      throw new CustomError("error_not_found", "Wifi not found");
    }

    if (wifi.userId !== userId) {
      throw new CustomError(
        "error_forbidden",
        "This wifi record does not belong to you"
      );
    }

    return wifi;
  }
}
