import './SearchResults.css';
import BookCard from '../BookCard/BookCard';
import type { Book } from '../../types';

interface SearchResultsProps {
    books: Book[];
    setSelectedBook: (book: Book) => void;
}

function SearchResults({books, setSelectedBook }: SearchResultsProps) {
    
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            {books.length === 0 ? (
                <p>No search results yet. Enter a title in the search bar above.</p>
            ) : (
            <BookCard books={books} setSelectedBook={setSelectedBook}/>
            )}
        </div>
    )
}

export default SearchResults;