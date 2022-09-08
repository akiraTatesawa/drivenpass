import { DecryptedCredential } from "../../@types/credentialTypes";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { CredentialBusinessRulesInterface } from "../businessRules/credentialBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListOneCredentialInterface {
  list(userId: number, credentialId: number): Promise<DecryptedCredential>;
}

export class ListOneCredentialService implements ListOneCredentialInterface {
  constructor(
    private credentialBusinessRules: CredentialBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.credentialBusinessRules = credentialBusinessRules;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async list(
    userId: number,
    credentialId: number
  ): Promise<DecryptedCredential> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

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
