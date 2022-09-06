import { User } from "@prisma/client";
import { CustomError } from "../../entities/CustomError";
import { UserRepositoryInterface } from "../../repositories/userRepository";

export interface UserBusinessRulesInterface {
  ensureUserDoesNotExist: (email: string) => Promise<void>;
}

export class UserBusinessRules implements UserBusinessRulesInterface {
  constructor(private userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async ensureUserDoesNotExist(email: string) {
    const user: User | null = await this.userRepository.findByEmail(email);

    if (user) {
      throw new CustomError(
        "error_conflict",
        "This user is already registered"
      );
    }
  }
}
