import './SearchResults.css';
import BookCard from '../BookCard/BookCard';

function SearchResults() {
    
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    )
}

export default SearchResults;