"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import {AuthorList} from '../components/AuthorList';

import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            author:{
                authorList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            },
            book:{
                bookList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                createState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                updateState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                deleteState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            }
        }
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} book={this.state.book} />)}/>
                    <Route path='/authors' render={(props) => (<AuthorList {...props} author={this.state.author} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    componentDidUpdate() {
        this._onBookChange.bind(this);
        this._onAuthorChange.bind(this);
    }

    _onBookChange(){
        this.setState({book: BookStore.getAllBooks()});
    }

    _onAuthorChange(){
        this.setState({author: AuthorStore.getAllAuthors()});
    }
}