import { createActions, handleActions } from 'redux-actions'

const actions = createActions({
    CHANGE: newCondition => newCondition
})
export const { change } = actions

const initialState = {
    key: "",
    sex: -1,
    page: 1,
    limit: 10
}
export default handleActions({
    [change]: (state, { payload }) => ({ ...state, ...payload })
}, initialState)

