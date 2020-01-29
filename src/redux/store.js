import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import user from './userReducer';
import rootReducer from './rootReducer'

export default createStore(user, applyMiddleware(promiseMiddleware) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());