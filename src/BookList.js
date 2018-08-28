import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js';

// This is a functional React component to render the book shelves
// We use array sorting and filtering to choose which books to show in each shelf
// we fire the handleShelfMove up to the parent component to move the book for us.
function BookList(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading"
                        books={props.books.sort((a, b) => a.title - b.title).filter(book => book.shelf === 'currentlyReading')}
                        handleShelfMove={(newShelf, book) => props.handleShelfMove(newShelf, book)}></BookShelf>
                    <BookShelf title="Want to Read"
                        books={props.books.sort((a, b) => a.title - b.title).filter(book => book.shelf === 'wantToRead')}
                        handleShelfMove={(newShelf, book) => props.handleShelfMove(newShelf, book)}></BookShelf>
                    <BookShelf title="Read"
                        books={props.books.sort((a, b) => a.title - b.title).filter(book => book.shelf === 'read')}
                        handleShelfMove={(newShelf, book) => props.handleShelfMove(newShelf, book)}></BookShelf>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    );
}

export default BookList