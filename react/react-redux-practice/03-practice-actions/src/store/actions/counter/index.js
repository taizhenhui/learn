import { createActions, handleActions, combineActions } from 'redux-actions'
const actions = createActions({
    INCREASE: () => + 10,
    DECREASE: () => - 10,
    ASYNC_INCREASE: null,
    ASYNC_DECREASE: null,
    AUTO_INCREASE: null,
    STOP_AUTO_INCREASE: null,
    ADD: num => num,
})
console.log(actions);
export const {
    increase,
    decrease,
    asyncIncrease,
    asyncDecrease,
    autoIncrease,
    stopAutoIncrease,
    add
} = actions

export default handleActions({
    [combineActions(increase, decrease, add)]: (state, { payload }) => state + payload
}, 1000)