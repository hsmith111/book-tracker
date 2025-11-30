import './DoneReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book } from '../../types';

interface DoneReadingProps {
    doneReading: Book[];
    setSelectedBook: (book: Book) => void;
}

function DoneReading({ setSelectedBook, doneReading}: DoneReadingProps) {
    return (
        <div className="doneReading">
            <h2>Done</h2>
            {doneReading.length > 0 ? (
                <BookCard books={doneReading} setSelectedBook={setSelectedBook}/>
            ) : (
                <p>No titles in your Done list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default DoneReading;