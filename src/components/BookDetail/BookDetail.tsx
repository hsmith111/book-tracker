import './BookDetail.css';
import bookCover from '../../assets/a-tree-grows-in-brooklyn.jpg';


function BookDetail() {
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
            </div>
        </div>
    )
}

export default BookDetail;