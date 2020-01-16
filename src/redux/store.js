import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer';

export default createStore(userReducer, applyMiddleware(promiseMiddleware) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());