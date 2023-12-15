import { increase, decrease } from "../../actions/counter";
import { handleAction } from 'redux-actions'
import {combineReducers} from 'redux'
const increaseReducer = handleAction(increase, (state)=>{
    return state + 1;
},100)
const decreaseReducer = handleAction(decrease, (state)=>{
    return state - 1;
},100)
export default  combineReducers({
    increaseReducer,
    decreaseReducer
})