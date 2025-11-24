import './SearchResults.css';
import BookCard from '../BookCard/BookCard';

function SearchResults({books, setSelectedBook}) {
    
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