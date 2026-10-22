import './DoneReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';
import {getBooks} from "../../api";
import { useState, useEffect } from 'react';

interface DoneReadingProps {
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
}

function DoneReading({ setSelectedBook, setSelectedBookList}: DoneReadingProps) {
    const [doneReading, setDoneReading] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getBooks("done")
            .then(setDoneReading)
            .catch(err => {
                console.error("Error occurred: ", err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="doneReading">
            <h2>Done</h2>
            {loading && <p>List is loading...</p>}
            {error && <p>Could not load list.</p>}
            {!loading && !error && doneReading.length > 0 && (
                <BookCard books={doneReading} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList("done")}} />
            )}
            {!loading && !error && doneReading.length === 0 && (
                <p>No titles in your Done list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default DoneReading;