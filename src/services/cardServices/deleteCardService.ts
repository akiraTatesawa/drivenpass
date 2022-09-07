import { CardRepositoryInterface } from "../../repositories/cardRepository";
import { CardBusinessRulesInterface } from "./cardBusinessRules";

export interface DeleteCardInterface {
  delete(userId: number, cardId: number): Promise<void>;
}

export class DeleteCardService implements DeleteCardInterface {
  constructor(
    private cardRepository: CardRepositoryInterface,
    private cardBusinessRules: CardBusinessRulesInterface
  ) {
    this.cardRepository = cardRepository;
    this.cardBusinessRules = cardBusinessRules;
  }

  async delete(userId: number, cardId: number): Promise<void> {
    await this.cardBusinessRules.validateCardByIdOrFail(cardId, userId);

    await this.cardRepository.delete(cardId);
  }
}
