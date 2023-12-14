import { actionsTypes } from '../../action/counter'


export default function (state = 10, action) {
    switch (action.type) {
        case actionsTypes.increase:
            return state + 1
        case actionsTypes.decrease:
            return state - 1
        default:
            return state
    }
}