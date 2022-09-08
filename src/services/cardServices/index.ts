import { CardRepository } from "../../repositories/cardRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { CardBusinessRules } from "../businessRules/cardBusinessRules";
import { CreateCardService } from "./createCardService";
import { ListAllCardsService } from "./listAllCardsService";
import { ListOneCardService } from "./listOneCardService";
import { DeleteCardService } from "./deleteCardService";
import { userBusinessRules } from "../userServices/index";

const cardRepository = new CardRepository();
const cardBusinessRules = new CardBusinessRules(cardRepository);

export const createCardService = new CreateCardService(
  cardRepository,
  cardBusinessRules,
  userBusinessRules,
  cryptUtils
);

export const listAllCardsService = new ListAllCardsService(
  cardRepository,
  userBusinessRules,
  cryptUtils,
  dateUtils
);

export const listOneCardService = new ListOneCardService(
  cardBusinessRules,
  userBusinessRules,
  cryptUtils,
  dateUtils
);

export const deleteCardService = new DeleteCardService(
  cardRepository,
  cardBusinessRules,
  userBusinessRules
);
