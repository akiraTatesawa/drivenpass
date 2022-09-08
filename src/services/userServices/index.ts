import { UserRepository } from "../../repositories/userRepository";
import { Utils } from "../../utils";
import { UserBusinessRules } from "../businessRules/userBusinessRules";
import { CreateUserService } from "./createUserService";
import { SignInUserService } from "./userSignInService";

const userRepository = new UserRepository();

export const userBusinessRules = new UserBusinessRules(
  userRepository,
  Utils.CryptUtils
);

export const createUserService = new CreateUserService(
  userRepository,
  userBusinessRules,
  Utils.CryptUtils
);

export const signInUserService = new SignInUserService(
  userBusinessRules,
  Utils.JwtUtils
);
