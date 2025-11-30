import './ToBeRead.css';
import BookCard from '../BookCard/BookCard';
import type { Book } from '../../types';

interface ToBeReadProps {
    tbrBooks: Book[];
    setSelectedBook: (book: Book) => void;
}

function ToBeRead({ setSelectedBook, tbrBooks}: ToBeReadProps) {
    return (
        <div className="toBeRead">
            <h2>To Be Read</h2>
            {tbrBooks.length > 0 ? (
                <BookCard books={tbrBooks} setSelectedBook={setSelectedBook}/>
            ) : (
                <p>No titles in your TBR list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default ToBeRead;