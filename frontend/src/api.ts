import type { Book } from "./types";

export const baseUrl = 'http://localhost:8080';

export const readingListIds = {
    "current": 1,
    "done": 2,
    "tbr": 3
};

export type ReadingListKey = keyof typeof readingListIds;

export function getBooks(list: ReadingListKey): Promise<Book[]> {
    return fetch(`${baseUrl}/reading-lists/${readingListIds[list]}/books`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error occurred: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
}

export function saveBook(googleId: string, list: ReadingListKey): Promise<Book>  {
    return fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            googleId: googleId,
            readingListId: readingListIds[list]
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error occurred: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
}

export function removeBook(list: ReadingListKey, googleId: string): Promise<void> {
    return fetch(`${baseUrl}/reading-lists/${readingListIds[list]}/books/${googleId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error occurred: ${response.status} ${response.statusText}`);
            }
        });
}