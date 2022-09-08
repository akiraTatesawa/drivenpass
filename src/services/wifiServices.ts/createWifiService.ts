import { WifiWithoutIdAndTimestamp } from "../../@types/wifiTypes";
import { Wifi } from "../../entities/Wifi";
import { WifiRepositoryInterface } from "../../repositories/wifiRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";

export interface CreateWifiInterface {
  create(wifiData: WifiWithoutIdAndTimestamp): Promise<void>;
}

export class CreateWifiService implements CreateWifiInterface {
  constructor(
    private wifiRepository: WifiRepositoryInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.wifiRepository = wifiRepository;
    this.cryptUtils = cryptUtils;
  }

  async create(wifiData: WifiWithoutIdAndTimestamp): Promise<void> {
    const wifi = new Wifi(wifiData, this.cryptUtils);

    await this.wifiRepository.insert(wifi);
  }
}
