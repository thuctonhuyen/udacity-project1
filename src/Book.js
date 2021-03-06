import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    render() {
        const {book, index, updateShelf} = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${(book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'}")`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf ? book.shelf : 'none'}
                                    onChange={(e) => updateShelf(book, e.target.value, index)}>
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
        )
    }
}

export default Book
