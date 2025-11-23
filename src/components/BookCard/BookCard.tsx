import './BookCard.css';
import { useNavigate } from 'react-router-dom';

function BookCard() {
    
    const navigate = useNavigate();
    
    return (
        <div className='BookCardInfo'>
            <p><strong>A Tree Grows in Brooklyn</strong><br />
            <em>Betty Smith</em></p>
            <button className="addBookButton" onClick={() => navigate('/book')}>See Details</button>
        </div>
    )
}

export default BookCard;