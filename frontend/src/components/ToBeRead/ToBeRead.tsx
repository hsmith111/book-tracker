import './ToBeRead.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';
import { getBooks } from "../../api.ts";
import { useState, useEffect } from 'react';

interface ToBeReadProps {
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
}

function ToBeRead({ setSelectedBook, setSelectedBookList }: ToBeReadProps) {
    const [tbrBooks, setTbrBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getBooks("tbr")
            .then(setTbrBooks)
            .catch(err => {
                console.error("Error occurred: ", err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="toBeRead">
            <h2>To Be Read</h2>
            {loading && <p>List is loading...</p>}
            {error && <p>Could not load list.</p>}
            {!loading && !error && tbrBooks.length > 0 && (
                <BookCard books={tbrBooks} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList("tbr")}} />
            )}
            {!loading && !error && tbrBooks.length === 0 && (
                <p>No titles in your TBR list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default ToBeRead;