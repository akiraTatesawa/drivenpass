import { CredentialRepository } from "../../repositories/credentialRepository";
import { cryptUtils, dateUtils } from "../../utils";
import { CreateCredentialService } from "./createCredentialService";
import { CredentialBusinessRules } from "./credentialBusinessRules";
import { ListCredentialsService } from "./listAllCredentialsService";
import { ListOneCredential } from "./listOneCredentialService";

const credentialRepository = new CredentialRepository();
const credentialBusinessRules = new CredentialBusinessRules(
  credentialRepository
);

export const createCredentialService = new CreateCredentialService(
  credentialRepository,
  credentialBusinessRules,
  cryptUtils
);

export const listAllCredentialsService = new ListCredentialsService(
  credentialRepository,
  cryptUtils,
  dateUtils
);

export const listOneCredential = new ListOneCredential(
  credentialBusinessRules,
  cryptUtils,
  dateUtils
);
