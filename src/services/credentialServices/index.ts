import { CredentialRepository } from "../../repositories/credentialRepository";
import { CryptUtils } from "../../utils/cryptUtils";
import { CreateCredentialService } from "./createCredentialService";
import { CredentialBusinessRules } from "./credentialBusinessRules";

const credentialRepository = new CredentialRepository();
const credentialBusinessRules = new CredentialBusinessRules(
  credentialRepository
);
const cryptUtils = new CryptUtils(process.env.CRYPTR_SECRET_KEY);

export const createCredentialService = new CreateCredentialService(
  credentialRepository,
  credentialBusinessRules,
  cryptUtils
);
