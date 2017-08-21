import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends Component {
    state = {
        books: [],
        searchBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        })
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.setState(state => ({
                books: this.updateShelfHelper(state.books, book, shelf)
            }));
        });
    };

    updateShelfHelper(books, book, shelf) {
        book.shelf = shelf;
        return (books.filter((b) => b.id !== book.id).concat([book]));
    }

    getHashTableOfBookShelf(){
        let hashTable = {};
        this.state.books.map((book) => (hashTable[book.id] = book));
        return hashTable;
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <ListBooks books={this.state.books}
                                                               updateShelf={this.updateShelf}/>}/>
                <Route exact path="/search" render={({history}) =>
                    <SearchBook
                        books={this.state.books}
                        bookShelf={this.getHashTableOfBookShelf()}
                        updateShelf={this.updateShelf}
                    />}/>
            </div>
        )
    }
}

export default BooksApp
