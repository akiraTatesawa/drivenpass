import { FormattedNote } from "../../@types/noteTypes";
import { NoteRepositoryInterface } from "../../repositories/noteRepository";
import { DateUtilsInterface } from "../../utils/dateUtils";

export interface ListAllNotesInterface {
  listAll: (userId: number) => Promise<FormattedNote[]>;
}

export class ListNotesService implements ListAllNotesInterface {
  constructor(
    private noteRepository: NoteRepositoryInterface,
    private dateUtils: DateUtilsInterface
  ) {
    this.noteRepository = noteRepository;
    this.dateUtils = dateUtils;
  }

  async listAll(userId: number): Promise<FormattedNote[]> {
    const userNotes = await this.noteRepository.findAll(userId);

    const formattedNotes: FormattedNote[] = userNotes.map((note) => ({
      ...note,
      createdAt: this.dateUtils.format(note.createdAt),
    }));

    return formattedNotes;
  }
}
