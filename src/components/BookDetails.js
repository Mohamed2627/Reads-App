import React, {memo, useEffect, useState} from 'react';
import * as booksApis from "../BooksAPI";

function BookDetails({book, handleChange}) {

    const [shelf, setShelf] = useState("");

    useEffect(() => {
        const getBookById = async () => {
            const res = await booksApis.get(book.id);
            setShelf(res.shelf)
        }
        getBookById();
    },[book.id])

    const change = (event) => {
        handleChange(book, event.target.value)
    }
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book?.imageLinks?.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={change}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book?.title}</div>
            <div className="book-authors">{book?.authors}</div>
        </div>
    )
}

export default  memo(BookDetails)