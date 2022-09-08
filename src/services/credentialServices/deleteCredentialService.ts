import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";
import { CredentialBusinessRulesInterface } from "../businessRules/credentialBusinessRules";

export interface DeleteCredentialInterface {
  delete: (credentialId: number, userId: number) => Promise<void>;
}

export class DeleteCredentialService implements DeleteCredentialInterface {
  constructor(
    private credentialRepository: CredentialRepositoryInterface,
    private credentialBusinessRules: CredentialBusinessRulesInterface
  ) {
    this.credentialRepository = credentialRepository;
    this.credentialBusinessRules = credentialBusinessRules;
  }

  async delete(credentialId: number, userId: number): Promise<void> {
    await this.credentialBusinessRules.validateCredentialByIdOrFail(
      credentialId,
      userId
    );

    await this.credentialRepository.delete(credentialId);
  }
}
