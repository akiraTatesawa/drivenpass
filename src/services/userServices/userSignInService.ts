import { JWTUtilsInterface } from "../../utils/JWTUtils";
import { UserBusinessRulesInterface } from "./userBusinessRules";

export interface SignInUserInterface {
  signIn: (email: string, password: string) => Promise<string>;
}

export class SignInUserService {
  constructor(
    private userBusinessRules: UserBusinessRulesInterface,
    private jwtUtils: JWTUtilsInterface
  ) {
    this.userBusinessRules = userBusinessRules;
    this.jwtUtils = jwtUtils;
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userBusinessRules.validateUserOrFail(
      email,
      password
    );

    const token = this.jwtUtils.createToken({ userId: user.id });
    return token;
  }
}
