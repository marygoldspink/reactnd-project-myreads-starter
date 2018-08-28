import React from 'react';
import BookShelfChanger from './BookShelfChanger.js';

// This is a functional React component to render a single Book.
// It handles:
//  - No image being available, it will render just a grey box
//  - No authors being available, they will be rendered as an empty string
//  - Changing shelf - here I pull out the value of the new shelf and fire a
//    custom event called handleShelfMove with the new shelf and the book to move
function Book(props) {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (props.book.imageLinks ? props.book.imageLinks.thumbnail : '') + '")' }}></div>
                <div className="book-shelf-changer">
                    <BookShelfChanger value={props.book.shelf}
                        handleChange={(event) => props.handleShelfMove(event.target.value, props.book)}></BookShelfChanger>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors ? props.book.authors.join(', ') : ''}</div>
        </div>
    )
}

export default Book