import { NoteRepository } from "../../repositories/noteRepository";
import { NoteBusinessRules } from "./noteBusinessRules";
import { CreateNoteService } from "./createNoteService";
import { ListNotesService } from "./listAllNotesService";
import { dateUtils } from "../../utils";

const noteRepository = new NoteRepository();
const noteBusinessRules = new NoteBusinessRules(noteRepository);

export const createNoteService = new CreateNoteService(
  noteRepository,
  noteBusinessRules
);

export const listAllNotesService = new ListNotesService(
  noteRepository,
  dateUtils
);
