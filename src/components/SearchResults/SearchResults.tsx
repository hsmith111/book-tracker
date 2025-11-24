import './SearchResults.css';
import BookCard from '../BookCard/BookCard';

function SearchResults({books}) {
    
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <BookCard books={books}/>
        </div>
    )
}

export default SearchResults;