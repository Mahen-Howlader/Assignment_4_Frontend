export const Genre = {
  FICTION: "FICTION",
  NON_FICTION: "NON_FICTION",
  SCIENCE: "SCIENCE",
  HISTORY: "HISTORY",
  BIOGRAPHY: "BIOGRAPHY",
  FANTASY: "FANTASY",
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface AddbookProps {
  book: Book;
}

export interface IBorrow {
    quantity : number,
    dueDate : string,
}