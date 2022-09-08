import { UserRepositoryInterface } from "../../repositories/userRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";
import { User } from "../../entities/User";

export interface CreateUserInterface {
  create: (email: string, password: string) => Promise<void>;
}

export class CreateUserService implements CreateUserInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.userRepository = userRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(email: string, password: string): Promise<void> {
    await this.userBusinessRules.ensureUserDoesNotExist(email);
    const user = new User(email, password, this.cryptUtils);

    await this.userRepository.insert(user);
  }
}
