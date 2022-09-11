/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { Note } from "@prisma/client";
import { CustomError } from "../../entities/CustomError";
import { NoteRepositoryInterface } from "../../repositories/noteRepository";

export interface NoteBusinessRulesInterface {
  validateNoteByDetailsOrFail(userId: number, title: string): Promise<void>;
  validateNoteByIdOrFail(noteId: number, userId: number): Promise<Note>;
}

export class NoteBusinessRules implements NoteBusinessRulesInterface {
  constructor(private noteRepository: NoteRepositoryInterface) {
    this.noteRepository = noteRepository;
  }

  async validateNoteByDetailsOrFail(
    userId: number,
    title: string
  ): Promise<void> {
    const note = await this.noteRepository.findByUserIdAndTitle(title, userId);

    if (note) {
      throw new CustomError(
        "error_conflict",
        "You already have a note with this title"
      );
    }
  }

  async validateNoteByIdOrFail(noteId: number, userId: number): Promise<Note> {
    if (!noteId) {
      throw new CustomError("error_bad_request", "Note ID must be a number");
    }

    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new CustomError("error_not_found", "Note not found");
    }

    if (note.userId !== userId) {
      throw new CustomError(
        "error_forbidden",
        "This note does not belong to you"
      );
    }

    return note;
  }
}
