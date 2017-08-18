import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBook extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    onChange = (e) => {
        const values = e.target.value;
        this.props.onSearchBook(values);
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    render(){
        const {books,updateShelf} = this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.onSubmit} onChange={this.onChange}><input type="text" placeholder="Search by title or author"/></form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book)=>
                            <Book key={book.id} book={book} updateShelf={updateShelf}/>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook