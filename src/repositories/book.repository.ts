import prisma from '../prisma/client';
import { Book } from './data/book';

export const createBook = async (
  title: string,
  author: string,
  publicationDate: Date,
  genres: string[]
): Promise<Book> => {
  return prisma.book.create({
    data: {
      title,
      author,
      publicationDate,
      genres,
    },
  });
};

export const getBooks = async (): Promise<Book[]> => {
  return prisma.book.findMany();
};

export const getBookById = async (id: number): Promise<Book | null> => {
  return prisma.book.findUnique({ where: { id } });
};

export const updateBook = async (
  id: number,
  data: Partial<Book>
): Promise<Book> => {
  return prisma.book.update({
    where: { id },
    data,
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  await prisma.book.delete({ where: { id } });
};
