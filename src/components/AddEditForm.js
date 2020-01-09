import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import BookActions from "../actions/bookActions";

class AddEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book_id: 0,
      title: "",
      author_name: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleAuthorChange(e) {
    this.setState({ author_name: e.target.value });
  }

  handleCreate() {
    let book = {
      title: this.state.title,
      author_name: this.state.author_name
    };
    this.props.toggle();
    BookActions.createBook(book);
  }

  handleUpdate() {
    let book = {
      book_id: this.state.book_id,
      title: this.state.title,
      author_name: this.state.author_name
    };
    this.props.toggle();
    BookActions.updateBook(book);
  }

  componentDidMount() {
    if (this.props.book) {
      const { book_id, title, author_name } = this.props.book;
      this.setState({ book_id, title, author_name });
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="first">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={this.handleTitleChange}
            value={this.state.title === null ? "" : this.state.title}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="last">Author Name</Label>
          <Input
            type="text"
            name="author_name"
            id="author_name"
            onChange={this.handleAuthorChange}
            value={
              this.state.author_name === null ? "" : this.state.author_name
            }
            required
          />
        </FormGroup>
        <Button color="primary"
         onClick={this.state.book_id === 0 ? this.handleCreate : this.handleUpdate}
         disabled={!this.state.title || !this.state.author_name}>Submit</Button>
      </Form>
    );
  }
}

AddEditForm.propTypes = {
  book: PropTypes.object,
  toggle: PropTypes.func
};

export default AddEditForm;
