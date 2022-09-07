import { Request, Response } from "express";
import { NoteWithoutIdAndTimestamp } from "../@types/noteTypes";
import {
  createNoteService,
  deleteNoteService,
  listAllNotesService,
  listOneNoteService,
} from "../services/noteServices.ts";

export async function createNote(
  req: Request<{}, {}, NoteWithoutIdAndTimestamp>,
  res: Response<{}, { userId: number }>
) {
  await createNoteService.create(req.body, res.locals.userId);

  return res.sendStatus(201);
}

export async function listAllNotes(
  req: Request,
  res: Response<{}, { userId: number }>
) {
  const notes = await listAllNotesService.listAll(res.locals.userId);

  return res.send(notes);
}

export async function listOneNote(
  req: Request<{ noteId: string }>,
  res: Response<{}, { userId: number }>
) {
  const note = await listOneNoteService.list(
    res.locals.userId,
    parseInt(req.params.noteId, 10)
  );

  return res.send(note);
}

export async function deleteNote(
  req: Request<{ noteId: string }>,
  res: Response<{}, { userId: number }>
) {
  await deleteNoteService.delete(
    res.locals.userId,
    parseInt(req.params.noteId, 10)
  );

  return res.sendStatus(204);
}
