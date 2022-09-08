import { NoteWithoutIdAndTimestamp } from "../../@types/noteTypes";
import { Note } from "../../entities/Note";
import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { NoteBusinessRulesInterface } from "../businessRules/noteBusinessRules";

export class CreateNoteService {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private noteBusinessRules: NoteBusinessRulesInterface
  ) {
    this.noteRepository = noteRepository;
    this.noteBusinessRules = noteBusinessRules;
  }

  async create(noteData: NoteWithoutIdAndTimestamp, userId: number) {
    await this.noteBusinessRules.validateNoteByDetailsOrFail(
      userId,
      noteData.title
    );

    const note = new Note({ ...noteData, userId });

    console.log(note);

    await this.noteRepository.insert(note);
  }
}
