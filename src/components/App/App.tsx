import { Routes, Route } from 'react-router-dom';
import './App.css';
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import NavBar from '../NavBar/NavBar';
import BookDetail from '../BookDetail/BookDetail';
import { useState, useEffect } from 'react';
import type { Book } from '../../types';

function App() {

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [currentlyReading, setCurrentlyReading] = useState<Book[]>(() => {
    const saved = localStorage.getItem('currentlyReading'); // initializes and checks local storage when component is rendered
    return saved ? JSON.parse(saved) : [];
  });
  const [tbrBooks, setTbrBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('tbrBooks'); // initializes and checks local storage when component is rendered
    return saved ? JSON.parse(saved) : [];
  });
  const [doneReading, setDoneReading] = useState<Book[]>(() => {
    const saved = localStorage.getItem('doneReading'); // initializes and checks local storage when component is rendered
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('currentlyReading', JSON.stringify(currentlyReading));
  }, [currentlyReading]); // updates local storage when user adds a book to this list
  useEffect(() => {
    localStorage.setItem('tbrBooks', JSON.stringify(tbrBooks));
  }, [tbrBooks]); // updates local storage when user adds a book to this list
  useEffect(() => {
    localStorage.setItem('doneReading', JSON.stringify(doneReading));
  }, [doneReading]); // updates local storage when user adds a book to this list
  
  const addToCurrentBooks = (book: Book) => {
    setCurrentlyReading((currentlyReading) => [...currentlyReading, book]);
  }
  const addToTbrBooks = (book: Book) => {
    setTbrBooks((tbrBooks) => [...tbrBooks, book]);
  }
  const addToDoneReading = (book: Book) => {
    setDoneReading((doneReading) => [...doneReading, book]);
  }

  const removeFromCurrentBooks = (book: Book) => {
    setCurrentlyReading((currentlyReading) => (currentlyReading.filter((b) => b.id !== book.id)));
  }
  
  const removeFromTbrBooks = (book: Book) => {
    setTbrBooks((tbrBooks) => (tbrBooks.filter((b) => b.id !== book.id)));
  }
  
  const removeFromDoneBooks = (book: Book) => {
    setDoneReading((doneReading) => (doneReading.filter((b) => b.id !== book.id)));
  }

  return (
    <>
      <NavBar />
      <h1></h1>
      <SearchBar setSearchResults={setSearchResults} />

      <div className='container'>
        <Routes>
          <Route path="/" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} />} />
          <Route path="/home" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} />} />
          <Route path="/current" element={<CurrentlyReading currentlyReading={currentlyReading} setSelectedBook={setSelectedBook} />} />
          <Route path="/done" element={<DoneReading doneReading={doneReading} setSelectedBook={setSelectedBook} />} />
          <Route path="/tbr" element={<ToBeRead tbrBooks={tbrBooks} setSelectedBook={setSelectedBook} />} />
          <Route path="/book" element={ selectedBook ? (
            <BookDetail book={selectedBook} addToCurrentBooks={addToCurrentBooks} addToTbrBooks={addToTbrBooks} addToDoneReading={addToDoneReading} removeFromCurrentBooks={removeFromCurrentBooks} removeFromTbrBooks={removeFromTbrBooks} removeFromDoneBooks={removeFromDoneBooks} />) : (<div>No book selected.</div>)} />
        </Routes>
      </div>
    </>
  )
}

export default App
