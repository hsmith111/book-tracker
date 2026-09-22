import './BookDetail.css';
import { useNavigate } from 'react-router-dom';
import type { Book, BookList } from '../../types';

interface BookDetailProps {
    book: Book;
    list: BookList;
    addToCurrentBooks: (book: Book) => void;
    addToTbrBooks: (book: Book) => void;
    addToDoneReading: (book: Book) => void;
    removeFromList: (book: Book, list: BookList) => void;
}

function BookDetail({ book, addToCurrentBooks, addToTbrBooks, addToDoneReading, removeFromList, list }: BookDetailProps) {
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

    const navigate = useNavigate();
    const handleRemoveFromList = () => {
        removeFromList(book, list);
        switch (list) {
            case "current":
                navigate("/current");
                break;
            case "tbr":
                navigate("/tbr");
                break;
            case "done":
                navigate("/done");
                break;
        }
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
                <button onClick={handleRemoveFromList} disabled={list === "search"} >Remove from {list === "current" ? "Currently Reading" : list === "tbr" ? "To Be Read" : list === "done" ? "Done" : "Search Results"}</button>
            </div>
        </div>
    )
}

export default BookDetail;