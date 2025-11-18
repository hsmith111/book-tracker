import './SearchBar.css';

function SearchBar() {
    
    return (
        <>
            <form>
                <input type="text" id="search" placeholder="🔍 Enter book title" />
                <button type="submit" className="searchButton">Search</button>
            </form>
        </>
    )
}
export default SearchBar;