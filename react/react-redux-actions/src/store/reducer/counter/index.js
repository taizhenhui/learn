import { increase, decrease, add } from "../../action/counter"
import { handleActions } from 'redux-actions'
// export default function (state = 10, { type }) {
//     switch (type) {
//         case actionTypes.increase:
//             return state + 1;
//         case actionTypes.decrease:
//             return state - 1;
//         default:
//             return state;
//     }
// }

// const reducer = handleAction(increase, (state, action) => {
//     return state + 1;
// }, 20)

const reducer = handleActions({
    [increase]: state => state + 1,
    [decrease]: state => state - 1,
    [add]: (state, { payload }) => state + payload
}, 20)
export default reducer;