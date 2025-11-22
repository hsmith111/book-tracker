import { Routes, Route } from 'react-router-dom';
import './App.css'
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <h1></h1>
      <SearchBar />
      <div className='container'>
        <Routes>
          <Route path="/current" element={<CurrentlyReading />} />
          <Route path="/done" element={<DoneReading />} />
          <Route path="/tbr" element={<ToBeRead />} />
        </Routes>
      </div>
    </>
  )
}

export default App
