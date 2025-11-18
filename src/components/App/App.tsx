import './App.css'
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';

function App() {
  return (
    <>
      <h1>Book Tracker</h1>
      <div className='container'>
        <CurrentlyReading />
        <DoneReading />
        <ToBeRead />
      </div>
    </>
  )
}

export default App
