import { WifiDecrypted } from "../../@types/wifiTypes";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { WifiBusinessRulesInterface } from "../businessRules/wifiBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListOneWifi {
  list(userId: number, wifiId: number): Promise<WifiDecrypted>;
}

export class ListOneWifiService implements ListOneWifi {
  constructor(
    private wifiBusinessRules: WifiBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.wifiBusinessRules = wifiBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async list(userId: number, wifiId: number): Promise<WifiDecrypted> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const wifi = await this.wifiBusinessRules.validateWifiByIdOrFail(
      userId,
      wifiId
    );

    const decryptedWifi: WifiDecrypted = {
      ...wifi,
      password: this.cryptUtils.decryptData(wifi.password),
      createdAt: this.dateUtils.format(wifi.createdAt),
    };

    return decryptedWifi;
  }
}
