/* eslint-disable @typescript-eslint/naming-convention */

export interface IRepository<T, O> {
  insert(data: T): Promise<void>;
  findAll(userId: number): Promise<O[]>;
  findByUserIdAndTitle(title: string, userId: number): Promise<O | null>;
  findById(id: number): Promise<O | null>;
  delete(id: number): Promise<void>;
}
