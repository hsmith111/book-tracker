import './BookDetail.css';
import {useNavigate} from 'react-router-dom';
import type {Book, BookList} from '../../types';
import type { ReadingListKey } from '../../api';
import { saveBook, removeBook } from '../../api';
import {useState} from 'react';

interface BookDetailProps {
    book: Book;
    list: BookList;
}

const listNames: Record<BookList, string> = {
    current: "Currently Reading",
    tbr: "To Be Read",
    done: "Done",
    search: "Search Results"
}

function BookDetail({book, list}: BookDetailProps) {
    const [selectedList, setSelectedList] = useState("");
    const [message, setMessage] = useState("");
    const [currentList, setCurrentList] = useState(list);

    const handleBookListSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMessage("");
        const value = e.target.value;
        if (value == "") {
            return;
        }
        const listKey = value as ReadingListKey;
        saveBook(book.id, listKey)
            .then(() => {
                setMessage(`This book has been added to ${listNames[listKey]}.`);
                setCurrentList(listKey);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
                })
            .finally(() => setSelectedList(""));
    }

    const navigate = useNavigate();
    const handleRemoveFromList = () => {
        setMessage("");
        if (currentList === "search") {
            return;
        }
        removeBook(currentList, book.id)
            .then(() => navigate(`/${currentList}`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
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
            <div>
                <p className='bookInfo'>
                    <strong>{book.volumeInfo.title}</strong><br/>
                    <em>{book.volumeInfo.authors?.join(', ') ?? 'Unknown author'}</em><br/>
                </p>

                <p className='bookDetails'>
                    <strong>Page Count:</strong> {book.volumeInfo.pageCount ? `${book.volumeInfo.pageCount} pgs` : 'N/A'}<br/>
                    {book.volumeInfo.averageRating != null && (
                        <><strong>Avg. Rating:</strong> {book.volumeInfo.averageRating}<br/></>
                    )}
                    <strong>Genre:</strong> {book.volumeInfo.categories?.join(', ') ?? 'N/A'}<br/>
                    <strong>Description:</strong> {book.volumeInfo.description ?? 'No description available.'}<br/>
                    <strong>Publisher:</strong> {book.volumeInfo.publisher ?? 'No publisher info available.'}<br/>
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">Read More on Google Books</a><br/>
                </p>
                <p>
                    <select className="dropdownStyle" onChange={handleBookListSelection} value={selectedList}>
                        <option value="">Add to a Book List...</option>
                        <option value="tbr">To Be Read</option>
                        <option value="current">Currently Reading</option>
                        <option value="done">Done</option>
                    </select>
                </p>
                <p>{message}</p>
                <button onClick={handleRemoveFromList} disabled={currentList === "search"}>Remove
                    from {listNames[currentList]}</button>
            </div>
        </div>
    )
}

export default BookDetail;