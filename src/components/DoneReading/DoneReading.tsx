import './DoneReading.css';
import BookCard from '../BookCard/BookCard';

function DoneReading() {
    return (
        <div className="doneReading">
            <h2>Done</h2>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    )
}

export default DoneReading;