import { CryptUtils as _CryptUtils } from "./cryptUtils";
import { DateUtils as _DateUtils } from "./dateUtils";
import { JWTUtils as _JWTUtils } from "./JWTUtils";

export namespace Utils {
  export const CryptUtils = new _CryptUtils(process.env.CRYPTR_SECRET_KEY);
  export const JwtUtils = new _JWTUtils(process.env.JWT_SECRET);
  export const DateUtils = new _DateUtils();
}
