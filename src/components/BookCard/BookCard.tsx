import './BookCard.css';

function BookCard() {
    return (
        <div className='BookCardInfo'>
            <p><strong>A Tree Grows in Brooklyn</strong><br />
            <em>Betty Smith</em></p>
            <button className="addBookButton">See Details</button>
            {/* <button className="removeBookButton">x</button> */}
        </div>
    )
}

export default BookCard;