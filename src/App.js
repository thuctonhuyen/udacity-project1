import React, {Component} from 'react';
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

    updateShelf = ((book, shelf, source, index) => {
        BooksAPI.update(book, shelf).then(() => {
            this.setState(state => ({
                books: this.updateShelfHelper(state.books, book, shelf)
            }));
        });

        if (source === 'search') {
            let searchBooks = this.state.searchBooks;
            searchBooks[index].shelf = shelf;
            this.setState({searchBooks});
        }
    });

    updateShelfHelper(books, book, shelf) {
        book.shelf = shelf;
        return (books.filter((b) => b.id !== book.id).concat([book]));
    }

    searchBook = ((query) => {
        if (!query || !query.trim()) {
            this.setState({searchBooks: []});
        }
        else {
            let _this = this;
            BooksAPI.search(query).then((books) => {
                if (typeof books.error === 'undefined') {
                    _this.syncWithCurrentShelf(books);
                }
                else
                    this.setState({searchBooks: []});
            });
        }
    });

    getHashTableOfBookShelf(){
        let hashTable = {};
        this.state.books.map((book) => (hashTable[book.id] = book));
        return hashTable;
    }

    syncWithCurrentShelf(books) {
        let bookShelf = this.getHashTableOfBookShelf();
        let searchBooks = books.filter((book) => typeof bookShelf[book.id] == 'undefined').concat(this.state.books);
        this.setState({searchBooks});
    }


    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <ListBooks books={this.state.books}
                                                               updateShelf={this.updateShelf}/>}/>
                <Route exact path="/search" render={({history}) =>
                    <SearchBook
                        books={this.state.searchBooks}
                        onSearchBook={this.searchBook}
                        updateShelf={this.updateShelf}
                    />}/>
            </div>
        )
    }
}

export default BooksApp
