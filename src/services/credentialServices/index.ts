import { CredentialRepository } from "../../repositories/credentialRepository";
import { CredentialBusinessRules } from "../businessRules/credentialBusinessRules";
import { Utils } from "../../utils";
import { CreateCredentialService } from "./createCredentialService";
import { ListCredentialsService } from "./listAllCredentialsService";
import { ListOneCredentialService } from "./listOneCredentialService";
import { DeleteCredentialService } from "./deleteCredentialService";
import { userBusinessRules } from "../userServices/index";

const credentialRepository = new CredentialRepository();
const credentialBusinessRules = new CredentialBusinessRules(
  credentialRepository
);

export const createCredentialService = new CreateCredentialService(
  credentialRepository,
  credentialBusinessRules,
  userBusinessRules,
  Utils.CryptUtils
);

export const listAllCredentialsService = new ListCredentialsService(
  credentialRepository,
  userBusinessRules,
  Utils.CryptUtils,
  Utils.DateUtils
);

export const listOneCredentialService = new ListOneCredentialService(
  credentialBusinessRules,
  userBusinessRules,
  Utils.CryptUtils,
  Utils.DateUtils
);

export const deleteCredentialService = new DeleteCredentialService(
  credentialRepository,
  credentialBusinessRules,
  userBusinessRules
);
