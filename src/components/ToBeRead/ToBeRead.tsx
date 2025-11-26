import './ToBeRead.css';
import BookCard from '../BookCard/BookCard';

function ToBeRead({books, setSelectedBook}) {
    return (
        <div className="toBeRead">
            <h2>To Be Read</h2>
            {books.length === 0 ? (
                <p>No titles in your TBR list yet. Enter a title in the search bar above and then add to list.</p>
            ) : (
            <BookCard books={books} setSelectedBook={setSelectedBook}/>
            )}
        </div>
    )
}

export default ToBeRead;