import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddEditForm from "./AddEditForm";
import BookActions from "../actions/bookActions";

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
      BookActions.deleteBook(this.props.book_id);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    const label = this.props.buttonLabel;

    let button = "";
    let content = "";
    let modal_title = "";

    if (label === "Delete") {
      button = (
        <Button
          color="danger"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      modal_title = "Delete Book";
      content = (
        <React.Fragment>
          <ModalBody>Delete Book Forever?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </React.Fragment>
      );
    } else if (label === "Edit") {
      button = (
        <Button
          color="warning"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      modal_title = "Edit Book";
      content = (
        <ModalBody>
          <AddEditForm toggle={this.toggle} book={this.props.book} />
        </ModalBody>
      );
    } else {
      button = (
        <Button
          color="success"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      modal_title = "Add New Book";
      content = (
        <ModalBody>
          <AddEditForm toggle={this.toggle} book={this.props.book} />
        </ModalBody>
      );
    }

    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {modal_title}
          </ModalHeader>
          {content}
        </Modal>
      </div>
    );
  }
}

ModalForm.propTypes = {
  book: PropTypes.object,
  buttonLabel: PropTypes.string.isRequired,
  book_id: PropTypes.number
};

export default ModalForm;
