import { NoteWithoutIdAndTimestamp } from "../@types/noteTypes";

export class Note implements NoteWithoutIdAndTimestamp {
  readonly userId: number;

  readonly title: string;

  readonly text: string;

  readonly password: string;

  constructor({ userId, title, text, password }: NoteWithoutIdAndTimestamp) {
    this.userId = userId;
    this.title = title;
    this.text = text;
    this.password = password;
  }
}
