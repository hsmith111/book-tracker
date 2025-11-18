import './App.css'
import DoneReading from '../DoneReading/DoneReading';
import ToBeRead from '../ToBeRead/ToBeRead';
import ReadingNow from '../ReadingNow/ReadingNow';

function App() {
  return (
    <>
      <h1>Book Tracker</h1>
      <div className='container'>
        <ReadingNow />
        <DoneReading />
        <ToBeRead />
      </div>
    </>
  )
}

export default App
