import { Request, Response } from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../repositories/book.repository';

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publicationDate, genres } = req.body;
    const book = await createBook(
      title,
      author,
      new Date(publicationDate),
      genres
    );
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllBooks = async (_req: Request, res: Response) => {
  const books = await getBooks();
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await getBookById(Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
};

export const editBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await updateBook(Number(req.params.id), req.body);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const removeBook = async (req: Request, res: Response) => {
  try {
    await deleteBook(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
