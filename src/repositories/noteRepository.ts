import { Note } from "@prisma/client";
import { NoteWithoutIdAndTimestamp } from "../@types/noteTypes";
import { prisma } from "../prisma";
import { IRepository } from "../@types/repositoryTypes";

export interface NoteRepositoryInterface
  extends IRepository<NoteWithoutIdAndTimestamp, Note> {}

export class NoteRepository implements NoteRepositoryInterface {
  async insert(note: NoteWithoutIdAndTimestamp): Promise<void> {
    await prisma.note.create({
      data: note,
    });
  }

  async findAll(userId: number): Promise<Note[]> {
    return prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number): Promise<Note | null> {
    return prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserIdAndTitle(
    title: string,
    userId: number
  ): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: {
        userId_title: {
          userId,
          title,
        },
      },
    });

    return note;
  }

  async delete(id: number): Promise<void> {
    await prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
