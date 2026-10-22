import './CurrentlyReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book } from '../../types';
import { getBooks } from '../../api';
import { useState, useEffect } from 'react';

interface CurrentlyReadingProps {
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: "current") => void;
}

function CurrentlyReading({ setSelectedBook, setSelectedBookList}: CurrentlyReadingProps) {

    const [currentlyReading, setCurrentlyReading] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getBooks("current")
            .then(setCurrentlyReading)
            .catch(err => {
                console.error("Error occurred: ", err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="currentlyReading">
            <h2>Currently Reading</h2>
            {loading && <p>List is loading...</p>}
            {error && <p>Could not load list.</p>}
            {!loading && !error && currentlyReading.length > 0 && (
                <BookCard books={currentlyReading} setSelectedBook={(book) => {
                    setSelectedBook(book);
                    setSelectedBookList("current");
                }}/>
            )}
            {!loading && !error && currentlyReading.length === 0 && (
                <p>No titles in your Currently Reading yet. Enter a title in the search bar above and then add to list.</p>
                )}
        </div>
    )}

export default CurrentlyReading;
