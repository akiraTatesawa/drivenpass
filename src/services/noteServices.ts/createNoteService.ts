import { NoteWithoutIdAndTimestamp } from "../../@types/noteTypes";
import { Note } from "../../entities/Note";
import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { NoteBusinessRulesInterface } from "../businessRules/noteBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface CreateNoteInterface {
  create(noteData: NoteWithoutIdAndTimestamp, userId: number): Promise<void>;
}

export class CreateNoteService implements CreateNoteInterface {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private noteBusinessRules: NoteBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface
  ) {
    this.noteRepository = noteRepository;
    this.noteBusinessRules = noteBusinessRules;
    this.userBusinessRules = userBusinessRules;
  }

  async create(noteData: NoteWithoutIdAndTimestamp, userId: number) {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    await this.noteBusinessRules.validateNoteByDetailsOrFail(
      userId,
      noteData.title
    );

    const note = new Note({ ...noteData, userId });

    await this.noteRepository.insert(note);
  }
}
