import './BookCard.css';
import { useNavigate } from 'react-router-dom';

function BookCard({books}) {
    
    const navigate = useNavigate();
    
    return (
        <div>   
            {books.map((book) => (
    <div key={book.id}>
        <div className="BookCardInfo">
            <p>
                <strong>{book.volumeInfo.title}</strong>
                <br />
                <em>{book.volumeInfo.authors?.join(', ')}</em>
                <br />
                <button className="addBookButton" onClick={() => navigate('/book')}>See Details</button>
            </p>
        </div>
        <hr />
    </div>
))}
 
        </div>
    );
}

export default BookCard;