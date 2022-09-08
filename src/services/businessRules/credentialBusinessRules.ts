/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { Credential } from "@prisma/client";
import { CustomError } from "../../entities/CustomError";
import { CredentialRepositoryInterface } from "../../repositories/credentialRepository";

export interface CredentialBusinessRulesInterface {
  validateCredentialByDetailsOrFail(
    userId: number,
    title: string
  ): Promise<void>;
  validateCredentialByIdOrFail(
    credentialId: number,
    userId: number
  ): Promise<Credential>;
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
        "You already have a credential with this title"
      );
    }
  }

  async validateCredentialByIdOrFail(
    credentialId: number,
    userId: number
  ): Promise<Credential> {
    if (!credentialId) {
      throw new CustomError(
        "error_bad_request",
        "Credential ID must be a number"
      );
    }

    const credential = await this.credentialRepository.findById(credentialId);

    if (!credential) {
      throw new CustomError("error_not_found", "Credential not found");
    }

    if (credential.userId !== userId) {
      throw new CustomError(
        "error_forbidden",
        "This credential does not belong to you"
      );
    }

    return credential;
  }
}
