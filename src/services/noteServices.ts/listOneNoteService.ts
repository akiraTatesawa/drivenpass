import { FormattedNote } from "../../@types/noteTypes";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { NoteBusinessRulesInterface } from "../businessRules/noteBusinessRules";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListOneNoteInterface {
  list(userId: number, noteId: number): Promise<FormattedNote>;
}

export class ListOneNoteService implements ListOneNoteInterface {
  constructor(
    private notesBusinessRules: NoteBusinessRulesInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.notesBusinessRules = notesBusinessRules;
    this.userBusinessRules = userBusinessRules;
    this.dateUtils = dateUtils;
  }

  async list(userId: number, noteId: number): Promise<FormattedNote> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const note = await this.notesBusinessRules.validateNoteByIdOrFail(
      noteId,
      userId
    );

    const formattedNote: FormattedNote = {
      ...note,
      createdAt: this.dateUtils.format(note.createdAt),
    };

    return formattedNote;
  }
}
