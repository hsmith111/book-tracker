import './CurrentlyReading.css';
import BookCard from '../BookCard/BookCard';
// import React, { useState } from 'react';

function CurrentlyReading({books, setSelectedBook}) {
    return (
        <div className="currentlyReading">
            <h2>Currently Reading</h2>
            {books.length === 0 ? (
                <p>No titles in your Currently Reading yet. Enter a title in the search bar above and then add to list.</p>
            ) : (
            <BookCard books={books} setSelectedBook={setSelectedBook}/>
            )}
        </div>
    )
}

export default CurrentlyReading;