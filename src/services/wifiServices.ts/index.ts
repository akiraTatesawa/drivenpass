import { WifiRepository } from "../../repositories/wifiRepository";
import { Utils } from "../../utils";
import { userBusinessRules } from "../userServices";
import { CreateWifiService } from "./createWifiService";
import { ListAllWifiService } from "./listAllWifiService";
import { ListOneWifiService } from "./listOneWifiService";
import { WifiBusinessRules } from "../businessRules/wifiBusinessRules";
import { DeleteWifiService } from "./deleteWifiService";

const wifiRepository = new WifiRepository();
const wifiBusinessRules = new WifiBusinessRules(wifiRepository);

export const createWifiService = new CreateWifiService(
  wifiRepository,
  userBusinessRules,
  Utils.CryptUtils
);

export const listAllWifiService = new ListAllWifiService(
  wifiRepository,
  userBusinessRules,
  Utils.CryptUtils,
  Utils.DateUtils
);

export const listOneWifiService = new ListOneWifiService(
  wifiBusinessRules,
  userBusinessRules,
  Utils.CryptUtils,
  Utils.DateUtils
);

export const deleteWifiService = new DeleteWifiService(
  wifiRepository,
  wifiBusinessRules,
  userBusinessRules
);
