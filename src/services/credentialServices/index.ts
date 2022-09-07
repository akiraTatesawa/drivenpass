import { CredentialRepository } from "../../repositories/credentialRepository";
import { CryptUtils } from "../../utils/cryptUtils";
import { DateUtils } from "../../utils/dateUtils";
import { CreateCredentialService } from "./createCredentialService";
import { CredentialBusinessRules } from "./credentialBusinessRules";
import { ListCredentialsService } from "./listAllCredentialsService";

const credentialRepository = new CredentialRepository();
const credentialBusinessRules = new CredentialBusinessRules(
  credentialRepository
);
const cryptUtils = new CryptUtils(process.env.CRYPTR_SECRET_KEY);
const dateUtils = new DateUtils();

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
