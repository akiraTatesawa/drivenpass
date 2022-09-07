import { UserRepository } from "../../repositories/userRepository";
import { cryptUtils, jwtUtils } from "../../utils";
import { CreateUserService } from "./createUserService";
import { UserBusinessRules } from "./userBusinessRules";
import { SignInUserService } from "./userSignInService";

const userRepository = new UserRepository();

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
