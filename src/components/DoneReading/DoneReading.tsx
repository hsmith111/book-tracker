import './DoneReading.css';
import BookCard from '../BookCard/BookCard';

function DoneReading({books, setSelectedBook}) {
    return (
        <div className="doneReading">
            <h2>Done</h2>
            {books.length === 0 ? (
                <p>No titles in your Done list yet. Enter a title in the search bar above and then add to list.</p>
            ) : (
            <BookCard books={books} setSelectedBook={setSelectedBook}/>
            )}
        </div>
    )
}

export default DoneReading;