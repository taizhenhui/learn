
import { actionTypes } from '../../actions/student/searchResult'

const initialState = {
    datas: [],
    isLoading: false,
    total: 0,
}
export default function (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.setTotal:
            return {
                ...state,
                ...payload
            }

        case actionTypes.setIsLoading:
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state
    }
}