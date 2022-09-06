import { UserRepositoryInterface } from "../../repositories/userRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { UserBusinessRules } from "./userBusinessRules";

export interface CreateUserInterface {
  create: (email: string, password: string) => Promise<void>;
}

export class CreateUserService implements CreateUserInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private userBusinessRules: UserBusinessRules,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.userRepository = userRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(email: string, password: string): Promise<void> {
    await this.userBusinessRules.ensureUserDoesNotExist(email);

    const hashedPassword = this.cryptUtils.hashDataBcrypt(password);

    await this.userRepository.insert(email, hashedPassword);
  }
}
