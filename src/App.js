import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        })
    }

    updateShelf = ((book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf).then(() => {
            this.setState(state => ({
                books: state.books.filter((b) => b.id !== book.id).concat([book])
            }));
        })

    });


    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <ListBooks books={this.state.books}
                                                               updateShelf={this.updateShelf}/>}/>
            </div>
        )
    }
}

export default BooksApp
