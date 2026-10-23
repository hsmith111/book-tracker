import './SearchResults.css';
import BookCard from '../BookCard/BookCard';
import type { Book, BookList } from '../../types';

interface SearchResultsProps {
    books: Book[];
    setSelectedBook: (book: Book) => void;
    setSelectedBookList: (list: BookList) => void;
    list: BookList;
}

function SearchResults({books, setSelectedBook, setSelectedBookList, list }: SearchResultsProps) {
    
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            {books.length === 0 ? (
                <p>No search results yet. Enter a title in the search bar above.</p>
            ) : (
            <BookCard books={books} setSelectedBook={(book) => {setSelectedBook(book); setSelectedBookList(list)}}/>
            )}
        </div>
    )
}

export default SearchResults;