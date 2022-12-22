import React from 'react';
import BookDetails from './BookDetails';

function BookShelf({ books, title, shelf, handleChange }) {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter((book) => book.shelf === shelf).map((book) => (
                        <li key={book.id}>
                            <BookDetails book={book} shelf={shelf} handleChange={handleChange} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf