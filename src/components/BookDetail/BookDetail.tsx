import './BookDetail.css';
import bookCover from '../../assets/a-tree-grows-in-brooklyn.jpg';

function BookDetail({ bookList, setBookList }) {

    return (
        <div className='bookDetailCard'>
            <img src={bookCover} className='bookImage' />
            
            <div className='bookInfo'>
                <p>
                    <strong>A Tree Grows in Brooklyn</strong><br />
                    <em>Betty Smith</em><br />
                </p>
            
                <p className='bookDetails'>
                    <strong>Details:</strong><br />
                    528 pages<br />
                    To Be Read<br />
                    Rating<br />
                    Genre<br />
                    Description<br />
                    URL<br />
                </p>
                <select className="dropdownStyle" value={bookList} onChange={(e) => setBookList(e.target.value)} >
                    <option value="">Add to a Book List...</option>
                    <option value="tbr">To Be Read</option>
                    <option value="current">Currently Reading</option>
                    <option value="done">Done </option>
                </select>
            </div>
        </div>
    )
}

export default BookDetail;