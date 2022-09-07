import { DecryptedCredential } from "../../@types/credentialTypes";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { CredentialBusinessRulesInterface } from "./credentialBusinessRules";

export class ListOneCredential {
  constructor(
    private credentialBusinessRules: CredentialBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.credentialBusinessRules = credentialBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async list(userId: number, credentialId: number) {
    const credential =
      await this.credentialBusinessRules.validateCredentialByIdOrFail(
        credentialId,
        userId
      );

    const decryptedCredential: DecryptedCredential = {
      ...credential,
      password: this.cryptUtils.decryptData(credential.password),
      createdAt: this.dateUtils.format(credential.createdAt),
    };

    return decryptedCredential;
  }
}
