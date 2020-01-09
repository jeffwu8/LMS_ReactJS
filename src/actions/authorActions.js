import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const AuthorsActions = {
    readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'read_authors_started'
        });
        axios.get('http://localhost:3000/author')
        .then(result => {
            Dispatcher.dispatch({
                actionType: 'read_authors_successful',
                data: result.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_authors_failure'
            });
        });
    },
}

module.exports = AuthorsActions;