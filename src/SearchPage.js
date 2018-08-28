import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid.js'

// This is our search page component. It stores it's own
// state of books since the list of books here is different to that
// in the App
class SearchPage extends React.Component {
    state = {
        books: []
    }

    // This function searches for the books
    searchBooks(searchText) {
        // If there is no search text then we should not show any books
        if (!searchText || searchText.length === 0) {
            this.setState({
                books: []
            });
            return;
        }
        // otherwise we search using the BooksAPI
        BooksAPI.search(searchText)
            .then(response => {
                // I got an error a few times so added code to handle
                // this and set the books to be empty.
                if (response.error) {
                    this.setState({
                        books: []
                    });
                } else {
                    // if we get no errors then we have a function which
                    // will load the book with it's shelf since we don't get
                    // that in the search results here
                    response.forEach(book => {
                        this.loadBook(book);
                    });
                    // we update the state with our books.
                    this.setState({
                        books: response
                    });
                }
            })
            .catch(response => {
                // in case of an error we'll set the books to an empty array again.
                this.setState({
                    books: []
                });
            });
    }

    // this function loads an individual book by its id
    loadBook(book) {
        BooksAPI.get(book.id)
            .then(bookResponse => {
                // when we have a response we copy the array of books from the state
                var books = this.state.books.slice();
                // then find out book in the array and update the shelf to be the one
                // from the server
                books.forEach(bookInState => {
                    if (bookInState.id === bookResponse.id) {
                        bookInState.shelf = bookResponse.shelf;
                    }
                });
                // finally we update the state with the updated books array
                this.setState({
                    books: books
                });
            });
    }

    // We have to handle a shelf move in this component since
    // it has it's own array of books.
    handleShelfMove(newShelf, book) {
        // first we copy the books array
        const books = this.state.books.slice();
        // then we find our book and update its shelf.
        books.forEach(stateBook => {
            if (stateBook.id === book.id) {
                stateBook.shelf = newShelf;
            }
        });
        // then we update the state.
        this.setState({
            books: books
        });
        // finally we tell our parent component that a book moved shelf
        // and let it update its collection of books.
        this.props.handleShelfMove(newShelf, book)
    }

    // in render() we use <Link /> for navigation
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.books ?
                        (<BooksGrid books={this.state.books}
                            handleShelfMove={(newShelf, book) => this.handleShelfMove(newShelf, book)}></BooksGrid>) :
                        ''}
                </div>
            </div>
        );
    }
}

export default SearchPage;