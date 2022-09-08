import { WifiDecrypted } from "../../@types/wifiTypes";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";
import { WifiRepositoryInterface } from "../../repositories/wifiRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";

export interface ListAllWifiInterface {
  listAll(userId: number): Promise<WifiDecrypted[]>;
}

export class ListAllWifiService implements ListAllWifiInterface {
  constructor(
    private wifiRepository: WifiRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.wifiRepository = wifiRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<WifiDecrypted[]> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const wifis = await this.wifiRepository.findAll(userId);

    const formattedWifiArray: WifiDecrypted[] = wifis.map((wifi) => ({
      ...wifi,
      password: this.cryptUtils.decryptData(wifi.password),
      createdAt: this.dateUtils.format(wifi.createdAt),
    }));

    return formattedWifiArray;
  }
}
