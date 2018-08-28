import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList.js'
import SearchPage from './SearchPage.js'
import './App.css'

class BooksApp extends React.Component {
  // For our state we just track the books currently on the shelf
  state = {
    books: []
  }

  // We'll load all the books when we construct the BooksApp
  constructor(state) {
    super(state);

    this.loadAllBooks();
  }

  // Here we load all books and set them on the state.
  loadAllBooks() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: books
        });
      });
  }

  handleShelfMove(newShelf, book) {
    // To handle a book moving shelf we create a copy of the array of books in the state
    const books = this.state.books.slice();
    // then we find our book to move in that array and update its shelf.
    books.forEach(stateBook => {
      if (stateBook.id === book.id) {
        stateBook.shelf = newShelf;
      }
    });
    // then we update the state so the user sees an immediate change
    this.setState({
      books: books
    });
    // then we save the change to the server
    BooksAPI.update(book, newShelf)
      .then(result => {
        // finally to be extra safe we reload all the books so any
        // other changes are also reloaded into the page.
        // I don't think this is necessary but I did to be on the safe side
        this.loadAllBooks();
      });
  }

  // In our render() function we either render the BookList or the SearchPage depending
  // on the current url
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/'
            render={(props) => <BookList books={this.state.books} handleShelfMove={(newShelf, book) => this.handleShelfMove(newShelf, book)} />}
          />
          <Route path='/search'
            render={(props) => <SearchPage handleShelfMove={(newShelf, book) => this.handleShelfMove(newShelf, book)} closeSearch={() => this.closeSearch()}></SearchPage>} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
