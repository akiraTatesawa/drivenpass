import { DecryptedCredential } from "../../@types/credentialTypes";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";

export interface ListAllCredentialsInterface {
  listAll: (userId: number) => Promise<DecryptedCredential[]>;
}

export class ListCredentialsService implements ListAllCredentialsInterface {
  constructor(
    private credentialRepository: CredentialRepositoryInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<DecryptedCredential[]> {
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
