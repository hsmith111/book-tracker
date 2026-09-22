import './ToBeRead.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';

interface ToBeReadProps {
    tbrBooks: Book[];
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
    list: BookList;
    removeFromList: (book: Book, list: BookList) => void;
}

function ToBeRead({ setSelectedBook, setSelectedBookList, tbrBooks, list, removeFromList}: ToBeReadProps) {
    return (
        <div className="toBeRead">
            <h2>To Be Read</h2>
            {tbrBooks.length > 0 ? (
                <BookCard books={tbrBooks} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList(list)}} list={list} removeFromList={removeFromList}/>
            ) : (
                <p>No titles in your TBR list yet. Enter a title in the search bar above and then add to list.</p>
            )}
        </div>
    )
}

export default ToBeRead;