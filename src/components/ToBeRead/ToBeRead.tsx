import './ToBeRead.css';
import BookCard from '../BookCard/BookCard';

function ToBeRead() {
    return (
        <div className="toBeRead">
            <h2>To Be Read</h2>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    )
}

export default ToBeRead;