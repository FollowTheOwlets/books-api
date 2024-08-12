export class Book {
  id: number;
  title: string;
  author: string;
  publicationDate: Date;
  genres: string[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: number,
    title: string,
    author: string,
    publicationDate: Date,
    genres: string[],
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationDate = publicationDate;
    this.genres = genres;
    this.createdAt = createdAt;
  }
}
