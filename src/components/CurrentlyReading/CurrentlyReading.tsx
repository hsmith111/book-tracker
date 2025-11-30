import './CurrentlyReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book } from '../../types';

interface CurrentlyReadingProps {
    currentlyReading: Book[];
    setSelectedBook: (book: Book) => void;
}

function CurrentlyReading({ setSelectedBook, currentlyReading}: CurrentlyReadingProps) {
    return (
        <div className="currentlyReading">
            <h2>Currently Reading</h2>
            {currentlyReading.length > 0 ? (
                <BookCard books={currentlyReading} setSelectedBook={setSelectedBook}/>
            ) : (
            <p>No titles in your Currently Reading yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default CurrentlyReading;