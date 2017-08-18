import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBook extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const values = e.target.value;

        this.props.onSearchBook(values);
    };

    render(){
        const {books,updateShelf} = this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                    <div className="search-books-input-wrapper">

                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <form onChange={this.handleSubmit}><input type="text" placeholder="Search by title or author"/></form>
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