import { Credential } from "../../entities/Credential";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { CredentialBusinessRulesInterface } from "../businessRules/credentialBusinessRules";
import { CredentialWithoutIdAndTimestamp } from "../../@types/credentialTypes";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

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
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.credentialBusinessRules = credentialBusinessRules;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(
    credentialData: CredentialWithoutIdAndTimestamp,
    userId: number
  ): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    await this.credentialBusinessRules.validateCredentialByDetailsOrFail(
      userId,
      credentialData.title
    );

    const credential = new Credential(
      {
        ...credentialData,
        userId,
      },
      this.cryptUtils
    );

    await this.credentialRepository.insert(credential);
  }
}
