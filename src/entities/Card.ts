import { CardType } from "@prisma/client";
import { CardWithoutIdAndTimestamp } from "../@types/cardTypes";
import { CryptUtilsInterface } from "../utils/cryptUtils";

export class Card implements CardWithoutIdAndTimestamp {
  readonly title: string;

  readonly userId: number;

  readonly number: string;

  readonly cardholderName: string;

  readonly expirationDate: string;

  readonly securityCode: string;

  readonly isVirtual: boolean;

  readonly password: string;

  readonly type: CardType;

  #cryptUtils: CryptUtilsInterface;

  constructor(
    {
      title,
      userId,
      number,
      cardholderName,
      expirationDate,
      securityCode,
      isVirtual,
      password,
      type,
    }: CardWithoutIdAndTimestamp,
    cryptUtils: CryptUtilsInterface
  ) {
    this.#cryptUtils = cryptUtils;
    this.title = title;
    this.userId = userId;
    this.number = number;
    this.cardholderName = cardholderName;
    this.expirationDate = expirationDate;
    this.securityCode = this.#cryptUtils.encryptData(securityCode);
    this.isVirtual = isVirtual;
    this.password = this.#cryptUtils.encryptData(password);
    this.type = type;
  }
}
