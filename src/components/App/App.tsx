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
import type { Book, BookList } from '../../types';

function App() {

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookList, setSelectedBookList] = useState<BookList | null>(null);

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

  const removeFromList = (book: Book, list: BookList) => {
    switch (list) {
      case "current":
        setCurrentlyReading(cr => cr.filter(b => b.id !== book.id));
        break;
        case "tbr":
          setTbrBooks(tbr => tbr.filter(b => b.id !== book.id));
          break;
          case "done":
            setDoneReading(dr => dr.filter(b => b.id !== book.id));
        break;
  }
}

  return (
    <>
      <NavBar />
      <h1></h1>
      <SearchBar setSearchResults={setSearchResults} />

      <div className='container'>
        <Routes>
          <Route path="/" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} removeFromList={removeFromList} list="search" />} />
          <Route path="/home" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} removeFromList={removeFromList} list="search" />} />
          <Route path="/current" element={<CurrentlyReading currentlyReading={currentlyReading} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} removeFromList={removeFromList} list="current"/>} />
          <Route path="/done" element={<DoneReading doneReading={doneReading} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} removeFromList={removeFromList} list="done" />} />
          <Route path="/tbr" element={<ToBeRead tbrBooks={tbrBooks} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} removeFromList={removeFromList} list="tbr" />} />
          <Route path="/book" element={ selectedBook ? (
            <BookDetail book={selectedBook} addToCurrentBooks={addToCurrentBooks} addToTbrBooks={addToTbrBooks} addToDoneReading={addToDoneReading} list={selectedBookList!} removeFromList={removeFromList} />) : (<div>No book selected.</div>)} />
        </Routes>
      </div>
    </>
  )
}

export default App
