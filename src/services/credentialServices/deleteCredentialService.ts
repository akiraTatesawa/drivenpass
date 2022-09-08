import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CredentialBusinessRulesInterface } from "../businessRules/credentialBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface DeleteCredentialInterface {
  delete(credentialId: number, userId: number): Promise<void>;
}

export class DeleteCredentialService implements DeleteCredentialInterface {
  constructor(
    private credentialRepository: CredentialRepositoryInterface,
    private credentialBusinessRules: CredentialBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.credentialBusinessRules = credentialBusinessRules;
    this.userBusinessRules = userBusinessRules;
  }

  async delete(credentialId: number, userId: number): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    await this.credentialBusinessRules.validateCredentialByIdOrFail(
      credentialId,
      userId
    );

    await this.credentialRepository.delete(credentialId);
  }
}
