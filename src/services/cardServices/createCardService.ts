import { CardRepositoryInterface } from "../../repositories/cardRepository";
import { CardBusinessRulesInterface } from "./cardBusinessRules";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { CardWithoutIdAndTimestamp } from "../../@types/cardTypes";
import { Card } from "../../entities/Card";

export interface CreateCardInterface {
  create: (cardData: CardWithoutIdAndTimestamp) => Promise<void>;
}

export class CreateCardService implements CreateCardInterface {
  constructor(
    private cardRepository: CardRepositoryInterface,
    private cardBusinessRules: CardBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.cardRepository = cardRepository;
    this.cardBusinessRules = cardBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(cardData: CardWithoutIdAndTimestamp): Promise<void> {
    await this.cardBusinessRules.validateCardByDetailsOrFail(
      cardData.userId,
      cardData.title
    );

    const card = new Card(cardData, this.cryptUtils);

    await this.cardRepository.insert(card);
  }
}
