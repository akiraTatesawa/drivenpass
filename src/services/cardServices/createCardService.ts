import { CardRepositoryInterface } from "../../repositories/cardRepository";
import { CardBusinessRulesInterface } from "../businessRules/cardBusinessRules";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { CardWithoutIdAndTimestamp } from "../../@types/cardTypes";
import { Card } from "../../entities/Card";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface CreateCardInterface {
  create: (cardData: CardWithoutIdAndTimestamp) => Promise<void>;
}

export class CreateCardService implements CreateCardInterface {
  constructor(
    private cardRepository: CardRepositoryInterface,
    private cardBusinessRules: CardBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.cardRepository = cardRepository;
    this.cardBusinessRules = cardBusinessRules;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
  }

  async create(cardData: CardWithoutIdAndTimestamp): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(cardData.userId);

    await this.cardBusinessRules.validateCardByDetailsOrFail(
      cardData.userId,
      cardData.title
    );

    const card = new Card(cardData, this.cryptUtils);

    await this.cardRepository.insert(card);
  }
}
