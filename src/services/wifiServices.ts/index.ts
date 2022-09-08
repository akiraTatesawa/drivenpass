import { WifiRepository } from "../../repositories/wifiRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { userBusinessRules } from "../userServices";
import { CreateWifiService } from "./createWifiService";
import { ListAllWifiService } from "./listAllWifiService";

const wifiRepository = new WifiRepository();

export const createWifiService = new CreateWifiService(
  wifiRepository,
  cryptUtils
);

export const listAllWifiService = new ListAllWifiService(
  wifiRepository,
  userBusinessRules,
  cryptUtils,
  dateUtils
);
