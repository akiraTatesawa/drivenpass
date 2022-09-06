import jwt from "jsonwebtoken";

export interface JWTUtilsInterface {
  createToken: (userObject: { userId: number }) => string;
}

export class JWTUtils implements JWTUtilsInterface {
  constructor(private JWTsecret: string) {
    this.JWTsecret = JWTsecret;
  }

  createToken(userObject: { userId: number }): string {
    const token = jwt.sign(userObject, this.JWTsecret);
    return token;
  }
}
