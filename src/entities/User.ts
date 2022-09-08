import { UserWithoutIdAndTimestamp } from "../@types/userTypes";
import { CryptUtilsInterface } from "../utils/cryptUtils";

export class User implements UserWithoutIdAndTimestamp {
  readonly email: string;

  readonly password: string;

  #cryptUtils: CryptUtilsInterface;

  constructor(
    email: string,
    password: string,
    cryptUtils: CryptUtilsInterface
  ) {
    this.#cryptUtils = cryptUtils;

    this.email = email;
    this.password = this.#cryptUtils.hashDataBcrypt(password);
  }
}
