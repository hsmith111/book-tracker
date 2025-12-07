export type BookList = "current" | "tbr" | "done" | "search";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    }
    authors?: string[];
    pageCount?: string;
    averageRating?: string;
    categories?: string[];
    description?: string;
    infoLink?: string;
  }
}