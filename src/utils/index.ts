import { CryptUtils } from "./cryptUtils";
import { JWTUtils } from "./JWTUtils";

export const cryptUtils = new CryptUtils(process.env.CRYPTR_SECRET_KEY);
export const jwtUtils = new JWTUtils(process.env.JWT_SECRET);
