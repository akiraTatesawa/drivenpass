import { DecryptedCredential } from "../../@types/credentialTypes";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListAllCredentialsInterface {
  listAll: (userId: number) => Promise<DecryptedCredential[]>;
}

export class ListCredentialsService implements ListAllCredentialsInterface {
  constructor(
    private credentialRepository: CredentialRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<DecryptedCredential[]> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const userCredentials = await this.credentialRepository.findAll(userId);

    const decryptedCredentials: DecryptedCredential[] = userCredentials.map(
      (credential) => ({
        ...credential,
        password: this.cryptUtils.decryptData(credential.password),
        createdAt: this.dateUtils.format(credential.createdAt),
      })
    );

    return decryptedCredentials;
  }
}
