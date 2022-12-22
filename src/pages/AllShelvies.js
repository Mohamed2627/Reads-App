/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as booksApis from "../BooksAPI";
import BookShelf from '../components/BookShelf';

const shelves = [
    {
        title: 'Currently Reading',
        shelf: 'currentlyReading',
    },
    {
        title: 'Want to Read',
        shelf: 'wantToRead',
    },
    {
        title: 'Read',
        shelf: 'read',
    },
    
];


function AllShelvies() {

    const [books, setBooks] = useState([])

    const getAllBooks = async () => {
        const res = await booksApis.getAll();
        setBooks(res)
    }

    const handleChange = (book, shelf) => {
        const updateBooks = async () => {
            const res = await booksApis.update(book, shelf)
        }
        updateBooks();
        getAllBooks();
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map((shelf) => (
                        <BookShelf
                        key={shelf.shelf}
                        books={books}
                        title={shelf.title}
                        shelf={shelf.shelf}
                        handleChange={handleChange}
                        />
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default AllShelvies