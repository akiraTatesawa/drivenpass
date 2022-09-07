import { CardRepository } from "../../repositories/cardRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { CardBusinessRules } from "./cardBusinessRules";
import { CreateCardService } from "./createCardService";
import { ListAllCardsService } from "./listAllCardsService";

const cardRepository = new CardRepository();
const cardBusinessRules = new CardBusinessRules(cardRepository);

export const createCardService = new CreateCardService(
  cardRepository,
  cardBusinessRules,
  cryptUtils
);

export const listAllCardsService = new ListAllCardsService(
  cardRepository,
  cryptUtils,
  dateUtils
);
