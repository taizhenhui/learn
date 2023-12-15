
import { createActions, handleActions } from 'redux-actions'

export const { setTotal, setIsLoading, fatchStudents } = createActions({
    SET_TOTAL: (datas, total) => ({ datas, total }),
    SET_IS_LOADING: isLoading => isLoading,
    FATCH_STUDENTS: null
})

const initialState = {
    datas: [],
    isLoading: false,
    total: 0,
}

export default handleActions({
    [setTotal]: (state, {payload}) => ({ ...state, ...payload }),
    [setIsLoading]: (state, {payload}) => ({ ...state, isLoading: payload }),
}, initialState)
