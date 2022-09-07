import { Note as NoteDB } from "@prisma/client";

export type NoteWithoutIdAndTimestamp = Omit<NoteDB, "id" | "createdAt">;

export interface FormattedNote {
  id: number;
  userId: number;
  title: string;
  text: string;
  createdAt: string;
}
