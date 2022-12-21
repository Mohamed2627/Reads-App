import React from 'react';
import "../App.css";
import BookDetails from './BookDetails';

function Search({ searchResults }) {


    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {searchResults?.map((book) => (
                    <li key={book.id}>
                        <BookDetails book={book} />
                    </li>
                ))}

            </ol>
        </div>
    )
}

export default Search