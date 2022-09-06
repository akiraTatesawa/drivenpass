import { UserRepository } from "../../repositories/userRepository";
import { CryptUtils } from "../../utils/cryptUtils";
import { JWTUtils } from "../../utils/JWTUtils";
import { CreateUserService } from "./createUserService";
import { UserBusinessRules } from "./userBusinessRules";
import { SignInUserService } from "./userSignInService";

const userRepository = new UserRepository();

const cryptUtils = new CryptUtils(process.env.CRYPTR_SECRET_KEY);
const jwtUtils = new JWTUtils(process.env.JWT_SECRET);

const userBusinessRules = new UserBusinessRules(userRepository, cryptUtils);

export const createUserService = new CreateUserService(
  userRepository,
  userBusinessRules,
  cryptUtils
);

export const signInUserService = new SignInUserService(
  userBusinessRules,
  jwtUtils
);
