/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import * as booksApis from "../BooksAPI";
import useDebounce from '../use-debounce';

function AddNewBook() {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [Error, setError] = useState(false)

    const debouncedSearchInput = useDebounce(searchInput, 1000);


    const handleChange = (book, shelf) => {
        const updateBooks = async () => {
            const res = await booksApis.update(book, shelf)
        }
        updateBooks();
    }


    useEffect(() => {
        const getSearchResults = async () => {
            if (debouncedSearchInput) {
                const res = await booksApis.search(debouncedSearchInput, 20)
                if (debouncedSearchInput.length === 0) {
                    setError(false);
                    setSearchResults([])
                }
                else if (res.error) {
                    setError(true);
                    // console.log(Error)
                    setSearchResults([]);
                }
                else {
                    setError(false);
                    const filteredRes = res.filter((book) => book?.imageLinks !== undefined)
                    setSearchResults(filteredRes)
                }
            }
            else {
                setError(false);
                setSearchResults([])
            }
        }
        getSearchResults();
    }, [debouncedSearchInput]);

    
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
                        onChange={(event) => setSearchInput(event.target.value)}
                        value={searchInput}
                    />
                </div>
            </div>
            {/* <div> */}
                {/* {Error && <h2>Sorry, there is no results for your search</h2>} */}
            {/* </div> */}
            <div className="search-books-results">
                <ol className="books-grid">
                    {Error && <h2>Sorry, No items match your search</h2>}
                    {searchResults?.map((book) => (
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