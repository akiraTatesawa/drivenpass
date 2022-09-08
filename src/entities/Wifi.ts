import { WifiWithoutIdAndTimestamp } from "../@types/wifiTypes";
import { CryptUtilsInterface } from "../utils/cryptUtils";

export class Wifi implements WifiWithoutIdAndTimestamp {
  readonly title: string;

  readonly userId: number;

  readonly wifiName: string;

  readonly password: string;

  #cryptUtils: CryptUtilsInterface;

  constructor(
    { title, userId, wifiName, password }: WifiWithoutIdAndTimestamp,
    cryptUtils: CryptUtilsInterface
  ) {
    this.#cryptUtils = cryptUtils;

    this.title = title;
    this.userId = userId;
    this.wifiName = wifiName;

    this.password = this.#cryptUtils.encryptData(password);
  }
}
