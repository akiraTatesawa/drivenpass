import { Note as NoteDB } from "@prisma/client";

export type NoteWithoutIdAndTimestamp = Omit<NoteDB, "id" | "createdAt">;
