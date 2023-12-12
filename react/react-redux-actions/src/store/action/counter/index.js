import { createActions, handleActions, combineActions } from 'redux-actions'

export const actionTypes = {
    increase: 'INCREASE',
    decrease: 'DECREASE',
    asyncIncrease: 'ASYNC_INCREASE', //异步增加
    asyncDecrease: 'ASYNC_DECREASE',
    autoIncrease: 'AUTO_INCREASE',
    stopAutoIncrease: 'STOP_AUTO_INCREASE',
    add: 'ADD'
}

// const increase123 = createAction(actionTypes.increase)
// console.log(increase123());
export const {
    increase,
    decrease,
    asyncIncrease,
    asyncDecrease,
    autoIncrease,
    stopAutoIncrease,
    add,
} = createActions({
    INCREASE: () => 1,
    DECREASE: () => -1,
    ASYNC_INCREASE: null,
    ASYNC_DECREASE: null,
    AUTO_INCREASE: null,
    STOP_AUTO_INCREASE: null,
    ADD: num => num
})

const actions = combineActions(increase, decrease, add)

export default handleActions({
    [actions]: (state, { payload }) => state + payload
}, 100)


