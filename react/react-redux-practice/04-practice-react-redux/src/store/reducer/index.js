import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import studentReducer from './studentReducer'
export default combineReducers({
    counter: counterReducer,
    student: studentReducer,
})