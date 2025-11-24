import { Routes, Route } from 'react-router-dom';
import './App.css'
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import NavBar from '../NavBar/NavBar';
import BookDetail from '../BookDetail/BookDetail';
import { useState } from 'react';

function App() {
  const [bookList, setBookList] = useState("");
  
  return (
    <>
      <NavBar />
      <h1></h1>
      <SearchBar />
      <div className='container'>
        <Routes>
          <Route path="/home" element={<SearchResults />} />
          <Route path="/current" element={<CurrentlyReading />} />
          <Route path="/done" element={<DoneReading />} />
          <Route path="/tbr" element={<ToBeRead />} />
          <Route path="/book" element={<BookDetail bookList={bookList} setBookList={setBookList} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
