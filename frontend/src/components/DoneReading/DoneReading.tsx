import './DoneReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';

interface DoneReadingProps {
    doneReading: Book[];
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
    list: BookList;
    removeFromList: (book: Book, list: BookList) => void;
}

function DoneReading({ setSelectedBook, setSelectedBookList, doneReading, list, removeFromList}: DoneReadingProps) {
    return (
        <div className="doneReading">
            <h2>Done</h2>
            {doneReading.length > 0 ? (
                <BookCard books={doneReading} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList(list)}} list={list} removeFromList={removeFromList}/>
            ) : (
                <p>No titles in your Done list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default DoneReading;