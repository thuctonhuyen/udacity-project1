import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    state = {};

    render() {

        const currentlyReadingBooks = this.props.books.filter((book) => book.shelf === 'currentlyReading');
        const readBooks = this.props.books.filter((book) => book.shelf === 'read');
        const wantToReadBooks = this.props.books.filter((book) => book.shelf === 'wantToRead');

        const bookShelf = {'My Read': currentlyReadingBooks, 'Read': readBooks, 'Want To Read': wantToReadBooks};

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(bookShelf).map((shelf, index) => (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{shelf}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookShelf[shelf].map((book) => (<li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                                        }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf}
                                                                    onChange={(e) => this.props.updateShelf(book, e.target.value)}>
                                                                <option value="none" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                </div>
            </div>
        );
    }
}
export default ListBooks