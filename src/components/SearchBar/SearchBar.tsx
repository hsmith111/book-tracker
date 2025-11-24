import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ setSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const searchGoogleBooks = (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
        console.warn("Search term is empty.");
        return;
    }

    const encodedQuery = encodeURIComponent(searchTerm);
    const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}`;

    fetch(searchURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Google Books API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(jsonResponse => {
        if (jsonResponse.items) {
            setSearchResults(jsonResponse.items);
            console.log("Search results:", jsonResponse.items);
            navigate('/home');
        } else {
            console.log("No books found.");
            setSearchResults([]);
            navigate('/home');
        }
    })
    .catch(error => {
        console.error("Google Books search failed:", error);
        alert("Failed to fetch books. Please try again.");
    });
};
    return (
        <>
            <form onSubmit={searchGoogleBooks} >
                <input type="text" id="search" placeholder="🔍 Enter book title" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                <button type="submit" className="searchButton" disabled={!searchTerm.trim()}>Search</button>
            </form>
            </>
        );
} 
export default SearchBar;
