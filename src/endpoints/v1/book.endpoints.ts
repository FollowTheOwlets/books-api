import { Router } from 'express';
import {
  addBook,
  getAllBooks,
  getBook,
  editBook,
  removeBook,
} from '../../services/book.service';
import { isAdmin } from '../../middleware/auth.middleware';

const bookEndpoints = Router();

bookEndpoints.post('/books', isAdmin, addBook);
bookEndpoints.get('/books', getAllBooks);
bookEndpoints.get('/books/:id', getBook);
bookEndpoints.put('/books/:id', isAdmin, editBook);
bookEndpoints.delete('/books/:id', isAdmin, removeBook);

export default bookEndpoints;
