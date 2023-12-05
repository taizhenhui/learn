import { SET_LOGIN_USER_TYPE } from '../action/loginUserActions'

const initialState = null
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOGIN_USER_TYPE:
            return payload
        default:
            return state
    }
}
