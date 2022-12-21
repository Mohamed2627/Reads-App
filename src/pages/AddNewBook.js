import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import * as booksApis from "../BooksAPI";

function AddNewBook() {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    console.log(searchInput);

    const handleChange = (book, shelf) => {
        const updateBooks = async () => {
            const res = await booksApis.update(book, shelf)
            console.log(res)
        }
        updateBooks();
    }


    useEffect(() => {
        const getSearchResults = async () => {
            if (searchInput.length !== 0) {
                const res = await booksApis.search(searchInput, 20)
                console.log(res)
                // setSearchResults(res)
                if (res.error) {
                    searchResults([])
                }
                else {
                    setSearchResults(res)
                }
                
                
            }
        }
        getSearchResults();


    }, [searchInput]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(event) => { setSearchInput(event.target.value); }}
                        value={searchInput}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults?.length !==0 && searchResults?.map((book) => (
                        <li key={book.id}>
                            <BookDetails book={book} handleChange={handleChange} />
                        </li>
                    ))}

                </ol>
            </div>
        </div>
    )
}

export default AddNewBook