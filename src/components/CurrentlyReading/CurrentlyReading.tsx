import './CurrentlyReading.css';
import BookCard from '../BookCard/BookCard';
// import React, { useState } from 'react';

function CurrentlyReading() {
    return (
        <div className="currentlyReading">
            <h2>Currently Reading</h2>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    )
}

export default CurrentlyReading;