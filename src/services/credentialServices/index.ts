import { CredentialRepository } from "../../repositories/credentialRepository";
import { CredentialBusinessRules } from "./credentialBusinessRules";
import { cryptUtils, dateUtils } from "../../utils";
import { CreateCredentialService } from "./createCredentialService";
import { ListCredentialsService } from "./listAllCredentialsService";
import { ListOneCredentialService } from "./listOneCredentialService";
import { DeleteCredentialService } from "./deleteCredentialService";

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

export const listOneCredentialService = new ListOneCredentialService(
  credentialBusinessRules,
  cryptUtils,
  dateUtils
);

export const deleteCredentialService = new DeleteCredentialService(
  credentialRepository,
  credentialBusinessRules
);
