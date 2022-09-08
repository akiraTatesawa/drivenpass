import { Credential } from "../../entities/Credential";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { CredentialBusinessRulesInterface } from "../businessRules/credentialBusinessRules";
import { CredentialWithoutIdAndTimestamp } from "../../@types/credentialTypes";

export interface CreateCredentialInterface {
  create: (
    credentialData: CredentialWithoutIdAndTimestamp,
    userId: number
  ) => Promise<void>;
}
export class CreateCredentialService implements CreateCredentialInterface {
  constructor(
    private credentialRepository: CredentialRepositoryInterface,
    private credentialBusinessRules: CredentialBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.credentialBusinessRules = credentialBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(
    credentialData: CredentialWithoutIdAndTimestamp,
    userId: number
  ): Promise<void> {
    await this.credentialBusinessRules.validateCredentialByDetailsOrFail(
      userId,
      credentialData.title
    );

    const credential = new Credential({
      ...credentialData,
      password: this.cryptUtils.encryptData(credentialData.password),
      userId,
    });

    await this.credentialRepository.insert(credential);
  }
}
