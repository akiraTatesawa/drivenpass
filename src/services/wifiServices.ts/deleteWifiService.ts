import { WifiRepositoryInterface } from "../../repositories/wifiRepository";
import { WifiBusinessRulesInterface } from "../businessRules/wifiBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface DeleteWifiInterface {
  delete(userId: number, wifiId: number): Promise<void>;
}

export class DeleteWifiService implements DeleteWifiInterface {
  constructor(
    private wifiRepository: WifiRepositoryInterface,
    private wifiBusinessRules: WifiBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface
  ) {
    this.wifiRepository = wifiRepository;
    this.wifiBusinessRules = wifiBusinessRules;
    this.userBusinessRules = userBusinessRules;
  }

  async delete(userId: number, wifiId: number): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);
    await this.wifiBusinessRules.validateWifiByIdOrFail(userId, wifiId);
    await this.wifiRepository.delete(wifiId);
  }
}
