import { Request, Response } from "express";
import { NoteWithoutIdAndTimestamp } from "../@types/noteTypes";
import {
  createNoteService,
  listAllNotesService,
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
