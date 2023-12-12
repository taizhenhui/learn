import { createActions, handleActions } from 'redux-actions'

const initialState = {
    datas: [],
    total: 0,
    isLoading: false
}
const actions = createActions({
    SET_STUDENTS_AND_TOTAL: (datas, total) => ({ datas, total }),
    SET_IS_LOADING: isLoading => isLoading,
    FETCH_STUDENTS: null
})
export const { setStudentsAndTotal, setIsLoading, fetchStudents } = actions

export default handleActions({
    [setStudentsAndTotal]: (state, { payload }) => ({ ...state, ...payload }),
    [setIsLoading]: (state, { payload }) => ({ ...state, isLoading: payload }),

}, initialState)
