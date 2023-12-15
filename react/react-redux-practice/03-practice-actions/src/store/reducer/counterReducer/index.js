import { increase, decrease } from "../../actions/counter";
import { handleActions } from 'redux-actions'

export default handleActions({
    [increase]: state => state + 1,
    [decrease]: state => state - 1
},100)