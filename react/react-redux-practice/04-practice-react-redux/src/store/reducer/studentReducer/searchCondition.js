import { actionTypes } from '../../actions/student/searchCondition'

const initialState = {
    key: "",
    sex: -1,
    page: 1,
    limit: 10
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.setSearchCondition:
            return {
                ...state,
                ...payload
            }

        default:
            return state
    }
}