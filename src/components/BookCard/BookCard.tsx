import './BookCard.css';

function BookCard() {
    return (
        <div className='BookCardInfo'>
            <p><strong>A Tree Grows in Brooklyn</strong><br />
            <em>Betty Smith</em><br />
            Progress: 30/250 pages</p>
            <button className="addBookButton">+</button>
            {/* <button className="removeBookButton">x</button> */}
        </div>
    )
}

export default BookCard;