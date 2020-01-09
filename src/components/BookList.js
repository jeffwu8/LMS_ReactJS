"use strict";

import React from "react";
import PropTypes from "prop-types";
import ModalForm from "./Modal";
import BookActions from "../actions/bookActions";

export class BookList extends React.Component {
  createBookRow(book) {
    return (
      <tr key={book.book_id}>
        <td> {book.book_id} </td>
        <td> {book.title} </td>
        <td> {book.author_name} </td>
        <td>
          <ModalForm buttonLabel="Edit" book={book} />
          <ModalForm buttonLabel="Delete" book_id={book.book_id} />
        </td>
      </tr>
    );
  }

  componentDidMount() {
    BookActions.readBooks();
  }

  render() {
    let content = "";

    if (this.props.book.readState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.props.book.readState.success) {
      content = (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.props.book.bookList.map(this.createBookRow, this)}
          </tbody>
        </table>
      );
    }

    if (this.props.book.createState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while adding books!
        </div>
      );
    }

    if (this.props.book.readState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while loading books!
        </div>
      );
    }

    if (this.props.book.updateState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while updating books!
        </div>
      );
    }

    if (this.props.book.deleteState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while deleting books!
        </div>
      );
    }

    return (
      <div>
        <h1>Books</h1>
        <ModalForm buttonLabel="Add Book" />
        {content}
      </div>
    );
  }
}

BookList.propTypes = {
  book: PropTypes.object.isRequired
};
