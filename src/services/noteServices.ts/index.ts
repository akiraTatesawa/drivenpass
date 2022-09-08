import { NoteRepository } from "../../repositories/noteRepository";
import { NoteBusinessRules } from "../businessRules/noteBusinessRules";
import { CreateNoteService } from "./createNoteService";
import { ListNotesService } from "./listAllNotesService";
import { dateUtils } from "../../utils";
import { ListOneNoteService } from "./listOneNoteService";
import { DeleteNoteService } from "./deleteNoteService";
import { userBusinessRules } from "../userServices";

const noteRepository = new NoteRepository();
const noteBusinessRules = new NoteBusinessRules(noteRepository);

export const createNoteService = new CreateNoteService(
  noteRepository,
  noteBusinessRules,
  userBusinessRules
);

export const listAllNotesService = new ListNotesService(
  noteRepository,
  userBusinessRules,
  dateUtils
);

export const listOneNoteService = new ListOneNoteService(
  noteBusinessRules,
  userBusinessRules,
  dateUtils
);

export const deleteNoteService = new DeleteNoteService(
  noteRepository,
  noteBusinessRules,
  userBusinessRules
);
