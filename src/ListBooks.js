import React, {Component} from 'react';
import Book from './Book'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'


class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    state = {};

    render() {
        const {books, updateShelf} = this.props;
        const bookShelf = {
            'Currently Reading': books.filter((book) => book.shelf === 'currentlyReading'),
            'Want To Read': books.filter((book) => book.shelf === 'wantToRead'),
            'Read': books.filter((book) => book.shelf === 'read')
        };

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(bookShelf).map((shelf, index) => (
                            <div className="bookshelf" key={shelf}>
                                <h2 className="bookshelf-title">{shelf}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookShelf[shelf].map((book) =>
                                            <Book key={book.id} book={book} updateShelf={updateShelf}/>
                                        )}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}
export default ListBooks