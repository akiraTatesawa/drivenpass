import { CardRepositoryInterface } from "../../repositories/cardRepository";
import { CardBusinessRulesInterface } from "../businessRules/cardBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface DeleteCardInterface {
  delete(userId: number, cardId: number): Promise<void>;
}

export class DeleteCardService implements DeleteCardInterface {
  constructor(
    private cardRepository: CardRepositoryInterface,
    private cardBusinessRules: CardBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface
  ) {
    this.cardRepository = cardRepository;
    this.cardBusinessRules = cardBusinessRules;
    this.userBusinessRules = userBusinessRules;
  }

  async delete(userId: number, cardId: number): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    await this.cardBusinessRules.validateCardByIdOrFail(cardId, userId);

    await this.cardRepository.delete(cardId);
  }
}
