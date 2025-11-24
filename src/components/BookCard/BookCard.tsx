import './BookCard.css';
import { useNavigate } from 'react-router-dom';

function BookCard({books, setSelectedBook}) {
    
    const navigate = useNavigate();
    
    return (
        <div>   
            {books.map((book) => (
    <div key={book.id}>
        <div className="BookCardInfo">
            {/* <img 
                src={book.volumeInfo.imageLinks.thumbnail} 
                alt={book.volumeInfo.title} 
                className="bookThumbnail"
            /> */}
            <p>
                <strong>{book.volumeInfo.title}</strong>
                <br />
                <em>{book.volumeInfo.authors?.join(', ')}</em>
                <br />
            </p>
            <button className="addBookButton" onClick={() => {setSelectedBook(book); navigate('/book');}}>See Details</button>
        </div>
        <hr />
    </div>
))}
 
        </div>
    );
}

export default BookCard;