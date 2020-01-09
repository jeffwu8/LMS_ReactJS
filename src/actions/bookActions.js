import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    createBook: function(body){
        Dispatcher.dispatch({
            actionType: 'create_books_started'
        });
        axios.post('http://localhost:3000/book', body)
        .then(result => {
            body.book_id = result.data.insertId;
            console.log(body);
            Dispatcher.dispatch({
                actionType: 'create_books_successful',
                data: body
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'create_books_failure'
            });
        });
    },

    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get('http://localhost:3000/book')
        .then(result => {
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data: result.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },

    updateBook: function(book){
        Dispatcher.dispatch({
            actionType: 'update_books_started'
        });
        const body = {title: book.title, author_name: book.author_name};
        axios.put('http://localhost:3000/book/' + book.book_id, body)
        .then(() => {
            Dispatcher.dispatch({
                actionType: 'update_books_successful',
                data: book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_books_failure'
            });
        });
    },

    deleteBook: function(book_id){
        Dispatcher.dispatch({
            actionType: 'delete_books_started'
        });
        axios.delete('http://localhost:3000/book/' + book_id)
        .then(() => {
            Dispatcher.dispatch({
                actionType: 'delete_books_successful',
                data : book_id
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_books_failure'
            });
        });
    }
}

module.exports = BooksActions;