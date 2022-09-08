import { WifiRepository } from "../../repositories/wifiRepository";
import { cryptUtils } from "../../utils";
import { CreateWifiService } from "./createWifiService";

const wifiRepository = new WifiRepository();

export const createWifiService = new CreateWifiService(
  wifiRepository,
  cryptUtils
);
