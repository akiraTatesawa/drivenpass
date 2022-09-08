import { CardRepository } from "../../repositories/cardRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { CardBusinessRules } from "../businessRules/cardBusinessRules";
import { CreateCardService } from "./createCardService";
import { ListAllCardsService } from "./listAllCardsService";
import { ListOneCardService } from "./listOneCardService";
import { DeleteCardService } from "./deleteCardService";

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

export const listOneCardService = new ListOneCardService(
  cardBusinessRules,
  cryptUtils,
  dateUtils
);

export const deleteCardService = new DeleteCardService(
  cardRepository,
  cardBusinessRules
);
