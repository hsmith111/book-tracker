import './BookDetail.css';

function BookDetail({ book, addToCurrentBooks }) {
    const handleBookListSelection = (e) => {
        const value = e.target.value;
        switch (value) {
            case "current":
                addToCurrentBooks(book);
                break;
        }
    }


    return (
        <div className='bookDetailCard'>
            {book.volumeInfo.imageLinks?.thumbnail && (
                <img 
                src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.png"} 
                alt={book.volumeInfo.title} 
                className="bookThumbnail"
            />
            )}
            <div >
                <p className='bookInfo'>
                    <strong>{book.volumeInfo.title}</strong><br />
                    <em>{book.volumeInfo.authors?.join(', ')}</em><br />
                </p>
            
                <p className='bookDetails'>
                    <strong>Page Count:</strong> {book.volumeInfo.pageCount} pgs<br />
                    <strong>Avg. Rating:</strong> {book.volumeInfo.averageRating ?? 'N/A'}<br />
                    <strong>Genre:</strong> {book.volumeInfo.categories?.join(', ') ?? 'N/A'}<br />
                    <strong>Description:</strong> {book.volumeInfo.description ?? 'No description available.'}<br />
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">Read More on Google Books</a><br />
                </p>
                <p>
                    <select className="dropdownStyle" onChange={handleBookListSelection}>
                        <option value="">Add to a Book List...</option>
                        <option value="tbr">To Be Read</option>
                        <option value="current">Currently Reading</option>
                        <option value="done">Done </option>
                    </select>
                </p>
            </div>
        </div>
    )
}

export default BookDetail;