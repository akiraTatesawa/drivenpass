import { UserRepository } from "../../repositories/userRepository";
import { CryptUtils } from "../../utils/cryptUtils";
import { CreateUserService } from "./createUserService";
import { UserBusinessRules } from "./userBusinessRules";

const userRepository = new UserRepository();
const userBusinessRules = new UserBusinessRules(userRepository);
const cryptUtils = new CryptUtils(process.env.CRYPTR_SECRET_KEY);

export const createUserService = new CreateUserService(
  userRepository,
  userBusinessRules,
  cryptUtils
);
