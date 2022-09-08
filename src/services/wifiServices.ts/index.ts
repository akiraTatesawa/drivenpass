import { WifiRepository } from "../../repositories/wifiRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { userBusinessRules } from "../userServices";
import { CreateWifiService } from "./createWifiService";
import { ListAllWifiService } from "./listAllWifiService";
import { ListOneWifiService } from "./listOneWifiService";
import { WifiBusinessRules } from "../businessRules/wifiBusinessRules";

const wifiRepository = new WifiRepository();
const wifiBusinessRules = new WifiBusinessRules(wifiRepository);

export const createWifiService = new CreateWifiService(
  wifiRepository,
  userBusinessRules,
  cryptUtils
);

export const listAllWifiService = new ListAllWifiService(
  wifiRepository,
  userBusinessRules,
  cryptUtils,
  dateUtils
);

export const listOneWifiService = new ListOneWifiService(
  wifiBusinessRules,
  userBusinessRules,
  cryptUtils,
  dateUtils
);
