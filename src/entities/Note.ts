import { NoteWithoutIdAndTimestamp } from "../@types/noteTypes";

export class Note implements NoteWithoutIdAndTimestamp {
  readonly userId: number;

  readonly title: string;

  readonly text: string;

  constructor({ userId, title, text }: NoteWithoutIdAndTimestamp) {
    this.userId = userId;
    this.title = title;
    this.text = text;
  }
}
