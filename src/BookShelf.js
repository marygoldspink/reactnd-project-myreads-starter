import React from 'react';
import BooksGrid from './BooksGrid.js';

// This is a functional React component to render a single shelf of Books with a given
// title and set of books.
function BookShelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <BooksGrid books={props.books}
                    handleShelfMove={props.handleShelfMove}></BooksGrid>
            </div>
        </div>
    )
}

export default BookShelf