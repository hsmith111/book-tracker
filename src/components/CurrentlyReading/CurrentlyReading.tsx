import './CurrentlyReading.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';

interface CurrentlyReadingProps {
    currentlyReading: Book[];
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
    list: BookList;
    removeFromList: (book: Book, list: BookList) => void;
}

function CurrentlyReading({ setSelectedBook, setSelectedBookList, currentlyReading, list, removeFromList}: CurrentlyReadingProps) {
    return (
        <div className="currentlyReading">
            <h2>Currently Reading</h2>
            {currentlyReading.length > 0 ? (
                <BookCard books={currentlyReading} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList(list)}} list={list} removeFromList={removeFromList}/>
            ) : (
            <p>No titles in your Currently Reading yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default CurrentlyReading;