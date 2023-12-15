
import { createActions, handleActions } from 'redux-actions'


export const { setSearchCondition } = createActions({
    SET_SEARCH_CONDITION: newCondition => newCondition
})

const initialState = {
    key: "",
    sex: -1,
    page: 1,
    limit: 10
}
export default handleActions({
    [setSearchCondition]: (state, { payload }) => ({ ...state, ...payload })
}, initialState)
