import { NoteRepository } from "../../repositories/noteRepository";
import { NoteBusinessRules } from "./noteBusinessRules";
import { CreateNoteService } from "./createNoteService";

const noteRepository = new NoteRepository();
const noteBusinessRules = new NoteBusinessRules(noteRepository);

export const createNoteService = new CreateNoteService(
  noteRepository,
  noteBusinessRules
);
