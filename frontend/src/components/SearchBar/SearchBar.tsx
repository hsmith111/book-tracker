import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types';
import { baseUrl } from '../../api';

interface SearchBarProps {
    setSearchResults: (books: Book[]) => void;
}

function SearchBar({ setSearchResults }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const searchGoogleBooks = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
        console.warn("Search term is empty.");
        return;
    }

    const encodedQuery = encodeURIComponent(searchTerm);

    fetch(`${baseUrl}/search?query=${encodedQuery}`)
    .then(async response => {
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || `Search failed: ${response.status}`);
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
        console.error("Book search failed:", error);
        alert(error.message);
    });
};
    return (
        <>
            <form onSubmit={searchGoogleBooks} >
                <input type="text" id="search" placeholder="🔍 Enter book title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} value={searchTerm} />
                <button type="submit" className="searchButton" disabled={!searchTerm.trim()}>Search</button>
            </form>
            </>
        );
} 
export default SearchBar;
