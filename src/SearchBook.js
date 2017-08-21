import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        bookShelf: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    state = {
        query: '',
        searchBooks: []
    };

    updateQuery = (query) => {
        query = query.trim();
        this.setState({query});
        this.search(query);
    };

    updateShelf = (book, shelf, index) => {
        //update in main page:
        this.props.updateShelf(book, shelf);

        //update in search page:
        let searchBooks = this.state.searchBooks;
        searchBooks[index].shelf = shelf;
        this.setState({searchBooks});
    };


    search = ((query) => {
        if (!query || !query.trim()) {
            this.setState({searchBooks: []});
        }
        else {
            BooksAPI.search(query).then((resultBooks) => {
                if (typeof resultBooks.error === 'undefined') {
                    this.syncWithCurrentShelf(resultBooks);
                }
                else
                    this.setState({searchBooks: []});
            });
        }
    });

    syncWithCurrentShelf = (result) => {
        const {books, bookShelf} = this.props;
        let searchBooks = result.filter((book) => typeof bookShelf[book.id] === 'undefined').concat(books);
        this.setState({searchBooks});
    };


    render() {
        const {query, searchBooks} = this.state;
        let showingBooks = (query) ? searchBooks : [];
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book, index) =>
                            <Book key={book.id}
                                  book={book}
                                  index={index}
                                  updateShelf={this.updateShelf}
                                  source="search"/>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook