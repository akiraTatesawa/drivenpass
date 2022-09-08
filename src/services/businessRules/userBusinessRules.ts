import { User } from "@prisma/client";
import { CustomError } from "../../entities/CustomError";
import { UserRepositoryInterface } from "../../repositories/userRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";

export interface UserBusinessRulesInterface {
  ensureUserDoesNotExist(email: string): Promise<void>;
  validateUserOrFail(email: string, password: string): Promise<User>;
  validateUserByIdOrFail(userId: number): Promise<void>;
}

export class UserBusinessRules implements UserBusinessRulesInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private cryptData: CryptUtilsInterface
  ) {
    this.userRepository = userRepository;
    this.cryptData = cryptData;
  }

  async ensureUserDoesNotExist(email: string): Promise<void> {
    const user: User | null = await this.userRepository.findByEmail(email);

    if (user) {
      throw new CustomError(
        "error_conflict",
        "This user is already registered"
      );
    }
  }

  async validateUserOrFail(email: string, password: string): Promise<User> {
    const user: User | null = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }
    if (!this.cryptData.validateEncryptedData(password, user.password)) {
      throw new CustomError("error_unauthorized", "Wrong password");
    }

    return user;
  }

  async validateUserByIdOrFail(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }
  }
}
