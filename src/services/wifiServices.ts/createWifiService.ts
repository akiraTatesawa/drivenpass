import { WifiWithoutIdAndTimestamp } from "../../@types/wifiTypes";
import { Wifi } from "../../entities/Wifi";
import { WifiRepositoryInterface } from "../../repositories/wifiRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface CreateWifiInterface {
  create(wifiData: WifiWithoutIdAndTimestamp): Promise<void>;
}

export class CreateWifiService implements CreateWifiInterface {
  constructor(
    private wifiRepository: WifiRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.wifiRepository = wifiRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(wifiData: WifiWithoutIdAndTimestamp): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(wifiData.userId);

    const wifi = new Wifi(wifiData, this.cryptUtils);

    await this.wifiRepository.insert(wifi);
  }
}
