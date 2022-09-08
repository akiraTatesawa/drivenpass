import { DecryptedCard } from "../../@types/cardTypes";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { CardBusinessRulesInterface } from "../businessRules/cardBusinessRules";

export interface ListOneCardInterface {
  list(userId: number, cardId: number): Promise<DecryptedCard>;
}

export class ListOneCardService implements ListOneCardInterface {
  constructor(
    private cardBusinessRules: CardBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.cardBusinessRules = cardBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async list(userId: number, cardId: number): Promise<DecryptedCard> {
    const card = await this.cardBusinessRules.validateCardByIdOrFail(
      cardId,
      userId
    );

    const decryptedCard: DecryptedCard = {
      ...card,
      password: this.cryptUtils.decryptData(card.password),
      securityCode: this.cryptUtils.decryptData(card.securityCode),
      createdAt: this.dateUtils.format(card.createdAt),
    };

    return decryptedCard;
  }
}
