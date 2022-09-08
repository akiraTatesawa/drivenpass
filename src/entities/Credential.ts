import { CredentialWithoutIdAndTimestamp } from "../@types/credentialTypes";
import { CryptUtilsInterface } from "../utils/cryptUtils";

export class Credential implements CredentialWithoutIdAndTimestamp {
  readonly userId: number;

  readonly title: string;

  readonly url: string;

  readonly username: string;

  readonly password: string;

  #cryptUtils: CryptUtilsInterface;

  constructor(
    { userId, title, url, username, password }: CredentialWithoutIdAndTimestamp,
    cryptUtils: CryptUtilsInterface
  ) {
    this.userId = userId;
    this.title = title;
    this.url = url;
    this.username = username;
    this.#cryptUtils = cryptUtils;

    this.password = this.#cryptUtils.encryptData(password);
  }
}
