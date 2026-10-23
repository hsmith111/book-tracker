import { Routes, Route } from 'react-router-dom';
import './App.css';
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import NavBar from '../NavBar/NavBar';
import BookDetail from '../BookDetail/BookDetail';
import { useState } from 'react';
import type { Book, BookList } from '../../types';

function App() {

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookList, setSelectedBookList] = useState<BookList | null>(null);

  return (
    <>
      <NavBar />
      <h1></h1>
      <SearchBar setSearchResults={setSearchResults} />

      <div className='container'>
        <Routes>
          <Route path="/" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} list="search" />} />
          <Route path="/home" element={<SearchResults books={searchResults} setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} list="search" />} />
          <Route path="/current" element={<CurrentlyReading setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} />} />
          <Route path="/done" element={<DoneReading setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} />} />
          <Route path="/tbr" element={<ToBeRead setSelectedBook={setSelectedBook} setSelectedBookList={setSelectedBookList} />} />
          <Route path="/book" element={ selectedBook ? (
            <BookDetail book={selectedBook} list={selectedBookList!} />) : (<div>No book selected.</div>)} />
        </Routes>
      </div>
    </>
  )
}

export default App
