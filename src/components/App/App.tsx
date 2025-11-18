import './App.css'
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  return (
    <>
      <h1>Book Log</h1>
      <SearchBar />
      <div className='container'>
        <CurrentlyReading />
        <DoneReading />
        <ToBeRead />
      </div>
    </>
  )
}

export default App
