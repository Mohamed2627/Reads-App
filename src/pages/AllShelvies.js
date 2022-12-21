import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import CurrentlyReading from '../components/CurrentlyReading';
// import WantToRead from '../components/WantToRead';
// import Read from '../components/Read';
import * as booksApis from "../BooksAPI";
import BookDetails from '../components/BookDetails';


function AllShelvies() {

    const [books, setBooks] = useState([])

    const getAllBooks = async () => {
        const res = await booksApis.getAll();
        console.log(res)
        setBooks(res)
    }
    // getAllBooks();

    const handleChange = (book, shelf) => {
        const updateBooks = async () => {
            const res = await booksApis.update(book, shelf)
            console.log(res)
        }
        updateBooks();
        getAllBooks();
    }

    useEffect(() => {
        const getAllBooks = async () => {
            const res = await booksApis.getAll();
            console.log(res)
            setBooks(res)
        }
        getAllBooks();

    }, []);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === "currentlyReading").map((book) => (
                                    <li key={book.id}>
                                        <BookDetails book={book} handleChange={handleChange} />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    {/* <
                        CurrentlyReading
                        currentlyReading={books.filter((book) => book.shelf === "currentlyReading")}
                        onChange={handleChange}
                    /> */}
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === "wantToRead").map((book) => (
                                    <li key={book.id}>
                                        <BookDetails book={book} handleChange={handleChange}/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    {/* <
                        WantToRead
                        wantToRead={books.filter((book) => book.shelf === "wantToRead")}
                        onChange={handleChange}
                    /> */}
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === "read").map((book) => (
                                    <li key={book.id}>
                                        <BookDetails book={book} handleChange={handleChange} />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    {/* <
                        Read
                        read={books.filter((book) => book.shelf === "read")}
                        onChange={handleChange}
                    /> */}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default AllShelvies