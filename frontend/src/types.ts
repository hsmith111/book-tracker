export type BookList = "current" | "tbr" | "done" | "search";

export interface Book {
  id: string;
  readingListId?: number;
  volumeInfo: {
    title: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    }
    authors?: string[];
    pageCount?: number;
    averageRating?: number;
    categories?: string[];
    description?: string;
    infoLink?: string;
    publisher?: string;
  }
}
