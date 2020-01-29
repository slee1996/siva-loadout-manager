import { combineReducers } from 'redux'
import loadoutReducer from './loadoutReducer'
import user from './userReducer'

export default combineReducers({
    loadoutReducer,
    user
})