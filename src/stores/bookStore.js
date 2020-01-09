import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _bookStore = {
  book: {
    bookList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    createState: {
      pending: false,
      success: false,
      failure: false
    },
    updateState: {
      pending: false,
      success: false,
      failure: false
    },
    deleteState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  }
};

class BookStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAllBooks() {
    return _bookStore.book;
  }

  resetCreateState() {
    _bookStore.book.createState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetReadState() {
    _bookStore.book.readState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetUpdateState() {
    _bookStore.book.updateState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetDeleteState() {
    _bookStore.book.deleteState = {
      pending: false,
      success: false,
      failure: false
    };
  }
}

const BookStore = new BookStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    //Create Book Cases
    case "create_books_successful": {
      BookStore.resetCreateState();

      const book = action.data;
      const bookList = _bookStore.book.bookList;
      bookList.push(book);
      _bookStore.book.bookList = bookList;

      _bookStore.book.createState.success = true;
      BookStore.emitChange();
      break;
    }
    case "create_books_failure": {
      BookStore.resetCreateState();
      _bookStore.book.createState.failure = true;
      BookStore.emitChange();
      break;
    }
    case "create_books_started": {
      BookStore.resetCreateState();
      _bookStore.book.createState.pending = true;
      BookStore.emitChange();
      break;
    }

    //Read Books Cases
    case "read_books_successful": {
      BookStore.resetReadState();
      _bookStore.book.bookList = action.data;
      _bookStore.book.readState.success = true;
      BookStore.emitChange();
      break;
    }
    case "read_books_failure": {
      BookStore.resetReadState();
      _bookStore.book.readState.failure = true;
      BookStore.emitChange();
      break;
    }
    case "read_books_started": {
      BookStore.resetReadState();
      _bookStore.book.readState.pending = true;
      BookStore.emitChange();
      break;
    }

    //Update Books Cases
    case "update_books_successful": {
      BookStore.resetUpdateState();

      const book = action.data;
      const bookList = _bookStore.book.bookList;
      const index = bookList.findIndex(
        ({ book_id }) => book_id === book.book_id
      );
      bookList[index] = book;

      _bookStore.book.bookList = bookList;
      _bookStore.book.updateState.success = true;
      BookStore.emitChange();
      break;
    }
    case "update_books_failure": {
      BookStore.resetUpdateState();
      _bookStore.book.updateState.failure = true;
      BookStore.emitChange();
      break;
    }
    case "update_books_started": {
      BookStore.resetUpdateState();
      _bookStore.book.updateState.pending = true;
      BookStore.emitChange();
      break;
    }

    //Delete Books Cases
    case "delete_books_successful": {
      BookStore.resetDeleteState();
      const delete_id = action.data;
      const bookList = _bookStore.book.bookList;

      _bookStore.book.bookList = bookList.filter(
        ({ book_id }) => book_id !== delete_id
      );
      _bookStore.book.deleteState.success = true;
      BookStore.emitChange();
      break;
    }
    case "delete_books_failure": {
      BookStore.resetDeleteState();
      _bookStore.book.deleteState.failure = true;
      BookStore.emitChange();
      break;
    }
    case "delete_books_started": {
      BookStore.resetDeleteState();
      _bookStore.book.deleteState.pending = true;
      BookStore.emitChange();
      break;
    }
    default:
      return;
  }
});

export default BookStore;
