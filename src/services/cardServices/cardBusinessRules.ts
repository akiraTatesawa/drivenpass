import { Card } from "@prisma/client";
import { CustomError } from "../../entities/CustomError";
import { CardRepositoryInterface } from "../../repositories/cardRepository";

export interface CardBusinessRulesInterface {
  validateCardByDetailsOrFail: (userId: number, title: string) => Promise<void>;
  validateCardByIdOrFail: (cardId: number, userId: number) => Promise<Card>;
}

export class CardBusinessRules implements CardBusinessRulesInterface {
  constructor(private cardRepository: CardRepositoryInterface) {
    this.cardRepository = cardRepository;
  }

  async validateCardByDetailsOrFail(
    userId: number,
    title: string
  ): Promise<void> {
    const credential = await this.cardRepository.findByUserIdAndTitle(
      title,
      userId
    );

    if (credential) {
      throw new CustomError(
        "error_conflict",
        "A credential with the same title already exists"
      );
    }
  }

  async validateCardByIdOrFail(cardId: number, userId: number): Promise<Card> {
    if (!cardId) {
      throw new CustomError("error_bad_request", "Card ID must be a number");
    }

    const card = await this.cardRepository.findById(cardId);

    if (!card) {
      throw new CustomError("error_not_found", "The card does not exist");
    }

    if (card.userId !== userId) {
      throw new CustomError(
        "error_forbidden",
        "This card does not belong to you"
      );
    }

    return card;
  }
}
