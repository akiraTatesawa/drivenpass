/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { CustomError } from "../../entities/CustomError";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";

export interface CredentialBusinessRulesInterface {
  validateCredentialByDetailsOrFail: (
    userId: number,
    title: string
  ) => Promise<void>;
  validateCredentialByIdOrFail: (
    credentialId: number,
    userId: number
  ) => Promise<void>;
}

export class CredentialBusinessRules
  implements CredentialBusinessRulesInterface
{
  constructor(private credentialRepository: CredentialRepositoryInterface) {
    this.credentialRepository = credentialRepository;
  }

  async validateCredentialByDetailsOrFail(
    userId: number,
    title: string
  ): Promise<void> {
    const credential = await this.credentialRepository.findByUserIdAndTitle(
      userId,
      title
    );

    if (credential) {
      throw new CustomError(
        "error_conflict",
        "A credential with the same title already exists"
      );
    }
  }

  async validateCredentialByIdOrFail(
    credentialId: number,
    userId: number
  ): Promise<void> {
    const credential = await this.credentialRepository.findById(credentialId);

    if (!credential) {
      throw new CustomError("error_not_found", "The credential does not exist");
    }

    if (credential.userId !== userId) {
      throw new CustomError(
        "error_forbidden",
        "This credential does not belong to you"
      );
    }
  }
}