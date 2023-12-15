export const actionTypes = {
    setSearchCondition: 'SET_SEARCH_CONDITION'
}

export const setSearchCondition = newCondition => {
    return {
        type: actionTypes.setSearchCondition,
        payload: newCondition
    }
}