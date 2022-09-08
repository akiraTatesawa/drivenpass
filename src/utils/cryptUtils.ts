import Cryptr from "cryptr";
import bcrypt from "bcrypt";

export interface CryptUtilsInterface {
  encryptData(data: string): string;
  decryptData(data: string): string;
  hashDataBcrypt(data: string): string;
  validateEncryptedData(data: string, hashData: string): boolean;
}

export class CryptUtils implements CryptUtilsInterface {
  #cryptr: Cryptr;

  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
    this.#cryptr = new Cryptr(this.#secret);
  }

  encryptData(data: string): string {
    return this.#cryptr.encrypt(data);
  }

  decryptData(data: string): string {
    return this.#cryptr.decrypt(data);
  }

  hashDataBcrypt(data: string): string {
    return bcrypt.hashSync(data, 10);
  }

  validateEncryptedData(data: string, hashData: string): boolean {
    return bcrypt.compareSync(data, hashData);
  }
}
