import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { NoteBusinessRulesInterface } from "../businessRules/noteBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface DeleteNoteInterface {
  delete: (userId: number, noteId: number) => Promise<void>;
}

export class DeleteNoteService implements DeleteNoteInterface {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private noteBusinessRules: NoteBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface
  ) {
    this.noteRepository = noteRepository;
    this.noteBusinessRules = noteBusinessRules;
    this.userBusinessRules = userBusinessRules;
  }

  async delete(userId: number, noteId: number): Promise<void> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    await this.noteBusinessRules.validateNoteByIdOrFail(noteId, userId);

    await this.noteRepository.delete(noteId);
  }
}
