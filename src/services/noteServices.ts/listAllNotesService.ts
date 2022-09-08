import { FormattedNote } from "../../@types/noteTypes";
import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { DateUtilsInterface } from "../../utils/dateUtils";
import { UserBusinessRulesInterface } from "../businessRules/userBusinessRules";

export interface ListAllNotesInterface {
  listAll(userId: number): Promise<FormattedNote[]>;
}

export class ListNotesService implements ListAllNotesInterface {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private userBusinessRules: UserBusinessRulesInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.noteRepository = noteRepository;
    this.userBusinessRules = userBusinessRules;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<FormattedNote[]> {
    await this.userBusinessRules.validateUserByIdOrFail(userId);

    const userNotes = await this.noteRepository.findAll(userId);

    const formattedNotes: FormattedNote[] = userNotes.map((note) => ({
      ...note,
      createdAt: this.dateUtils.format(note.createdAt),
    }));

    return formattedNotes;
  }
}
