import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { NoteBusinessRulesInterface } from "./noteBusinessRules";

export interface DeleteNoteInterface {
  delete: (userId: number, noteId: number) => Promise<void>;
}

export class DeleteNoteService implements DeleteNoteInterface {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private noteBusinessRules: NoteBusinessRulesInterface
  ) {
    this.noteRepository = noteRepository;
    this.noteBusinessRules = noteBusinessRules;
  }

  async delete(userId: number, noteId: number): Promise<void> {
    await this.noteBusinessRules.validateNoteByIdOrFail(noteId, userId);

    await this.noteRepository.delete(noteId);
  }
}
