import './BookDetail.css';
import type { Book } from '../../types';

interface BookDetailProps {
    book: Book;
    addToCurrentBooks: (book: Book) => void;
    addToTbrBooks: (book: Book) => void;
    addToDoneReading: (book: Book) => void;
    removeFromCurrentBooks: (book: Book) => void;
    removeFromTbrBooks: (book: Book) => void;
    removeFromDoneBooks: (book: Book) => void;
}

function BookDetail({ book, addToCurrentBooks, addToTbrBooks, addToDoneReading, removeFromCurrentBooks, removeFromTbrBooks, removeFromDoneBooks }: BookDetailProps) {
    const handleBookListSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        switch (value) {
            case "current":
                addToCurrentBooks(book);
                break;
            case "tbr":
                addToTbrBooks(book);
                break;
            case "done":
                addToDoneReading(book);
                break;
        }
    }

    const handleRemoveBookFromCurrentlyReadingList = () => {
        removeFromCurrentBooks(book);
    }
    
    const handleRemoveBookFromTbrList = (e: React.MouseEvent<HTMLButtonElement>) => {
        removeFromTbrBooks(book);
    }
    
    const handleRemoveFromDoneBooks = (e: React.MouseEvent<HTMLButtonElement>) => {
        removeFromDoneBooks(book);
    }


    return (
        <div className='bookDetailCard'>
            {book.volumeInfo.imageLinks?.thumbnail && (
                <img 
                src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.png"} 
                alt={book.volumeInfo.title} 
                className="bookThumbnail"
            />
            )}
            <div >
                <p className='bookInfo'>
                    <strong>{book.volumeInfo.title}</strong><br />
                    <em>{book.volumeInfo.authors?.join(', ') ?? 'Unknown author'}</em><br />
                </p>
            
                <p className='bookDetails'>
                    <strong>Page Count:</strong> {book.volumeInfo.pageCount} pgs<br />
                    <strong>Avg. Rating:</strong> {book.volumeInfo.averageRating ?? 'N/A'}<br />
                    <strong>Genre:</strong> {book.volumeInfo.categories?.join(', ') ?? 'N/A'}<br />
                    <strong>Description:</strong> {book.volumeInfo.description ?? 'No description available.'}<br />
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">Read More on Google Books</a><br />
                </p>
                <p>
                    <select className="dropdownStyle" onChange={handleBookListSelection}>
                        <option value="">Add to a Book List...</option>
                        <option value="tbr">To Be Read</option>
                        <option value="current">Currently Reading</option>
                        <option value="done">Done </option>
                    </select>
                </p>
                <button onClick={handleRemoveBookFromCurrentlyReadingList}>Remove from Currently Reading</button>
                <button onClick={handleRemoveBookFromTbrList}>Remove from TBR</button>
                <button onClick={handleRemoveFromDoneBooks}>Remove from Done</button>
            </div>
        </div>
    )
}

export default BookDetail;