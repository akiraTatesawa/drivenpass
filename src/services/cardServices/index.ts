import { CardRepository } from "../../repositories/cardRepository";
import { cryptUtils } from "../../utils";
import { CardBusinessRules } from "./cardBusinessRules";
import { CreateCardService } from "./createCardService";

const cardRepository = new CardRepository();
const cardBusinessRules = new CardBusinessRules(cardRepository);

export const createCardService = new CreateCardService(
  cardRepository,
  cardBusinessRules,
  cryptUtils
);
