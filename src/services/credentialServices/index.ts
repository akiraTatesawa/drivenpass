import { CredentialRepository } from "../../repositories/credentialRepository";
import { CredentialBusinessRules } from "../businessRules/credentialBusinessRules";
import { cryptUtils, dateUtils } from "../../utils";
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
  cryptUtils
);

export const listAllCredentialsService = new ListCredentialsService(
  credentialRepository,
  userBusinessRules,
  cryptUtils,
  dateUtils
);

export const listOneCredentialService = new ListOneCredentialService(
  credentialBusinessRules,
  userBusinessRules,
  cryptUtils,
  dateUtils
);

export const deleteCredentialService = new DeleteCredentialService(
  credentialRepository,
  credentialBusinessRules,
  userBusinessRules
);
