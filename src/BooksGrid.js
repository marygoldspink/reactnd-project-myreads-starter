import React from 'react';
import Book from './Book.js';

// This is a function React component to render books in a grid
// Note that we use the book.id as the key here
function BooksGrid(props) {
    if (!props.books) {
        return '';
    }
    return (
        <ol className="books-grid">
            {props.books.map(book => {
                return (
                    <li key={book.id}>
                        <Book book={book}
                            handleShelfMove={(newShelf, book) => props.handleShelfMove(newShelf, book)}></Book>
                    </li>
                )
            })}
        </ol>
    )
}

export default BooksGrid