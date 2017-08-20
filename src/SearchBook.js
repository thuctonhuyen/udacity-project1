import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'
import {Link} from 'react-router-dom'

class SearchBook extends Component {
    //TODO: keep state of query
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    state = {
        query: '',
    };

    updateQuery = (query) => {
        this.setState({query: query.trim()});
        this.props.onSearchBook(query.trim());
    };


    render() {
        const {books, updateShelf} = this.props;
        const {query} = this.state;
        let showingBooks = (query) ? books : [];

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
                            <Book key={book.id} book={book} index={index} updateShelf={updateShelf} source="search"/>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook