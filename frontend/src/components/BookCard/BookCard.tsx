import './BookCard.css';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types';

interface BookCardProps {
    books: Book[];
    setSelectedBook: (book: Book) => void;
}

function BookCard({books, setSelectedBook}: BookCardProps) {
    
    const navigate = useNavigate();
    
    return (
        <div>   
            {books.map((book) => (
    <div key={book.id}>
        <div className="bookCardInfo">
            <img 
                src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.png"} 
                alt={book.volumeInfo.title} 
                className="bookThumbnail"
            />
            <p>
                <strong>{book.volumeInfo.title}</strong>
                <br />
                <em>{book.volumeInfo.authors?.join(', ')}</em>
                <br />
            </p>
            <button className="addBookButton" onClick={() => {setSelectedBook(book); navigate('/book');}}>See Details</button>
        </div>
    </div>
))}
 
        </div>
    );
}

export default BookCard;