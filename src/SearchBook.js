import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'
import {Link} from 'react-router-dom'

class SearchBook extends Component{
    //TODO: keep state of query
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    state = {
      query: ''
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
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.onSubmit}>
                            <input onChange={this.onChange} type="text" placeholder="Search by title or author"/>
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book, index)=>
                            <Book key={book.id} book={book} index={index} updateShelf={updateShelf} source="search"/>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook