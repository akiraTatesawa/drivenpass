import { DecryptedCredential } from "../../@types/credentialTypes";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";

export class ListCredentialsService {
  constructor(
    private credentialsRepository: CredentialRepositoryInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.credentialsRepository = credentialsRepository;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number) {
    const userCredentials = await this.credentialsRepository.findAll(userId);

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
