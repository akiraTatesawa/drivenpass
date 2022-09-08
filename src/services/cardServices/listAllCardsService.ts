import { CardRepositoryInterface } from "../../repositories/cardRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { DecryptedCard } from "../../@types/cardTypes";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListAllCardsInterface {
  listAll(userId: number): Promise<DecryptedCard[]>;
}

export class ListAllCardsService implements ListAllCardsInterface {
  constructor(
    private cardRepository: CardRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private cryptUtils: CryptUtilsInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.cardRepository = cardRepository;
    this.userBusinessRules = userBusinessRules;
    this.cryptUtils = cryptUtils;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<DecryptedCard[]> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const cards = await this.cardRepository.findAll(userId);

    const decryptedCards: DecryptedCard[] = cards.map((card) => ({
      ...card,
      password: this.cryptUtils.decryptData(card.password),
      securityCode: this.cryptUtils.decryptData(card.securityCode),
      createdAt: this.dateUtils.format(card.createdAt),
    }));

    return decryptedCards;
  }
}
