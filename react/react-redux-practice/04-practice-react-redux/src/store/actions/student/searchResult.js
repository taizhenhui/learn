export const actionTypes = {
    setTotal: 'SET_TOTAL',
    setIsLoading: 'SET_IS_LOADING',
    fatchStudents: 'FETCH_STUDENTS',
}

export const setTotal = (datas, total) => ({
    type: actionTypes.setTotal,
    payload: { datas, total }
})

export const setIsLoading = isLoading => ({
    type: actionTypes.setIsLoading,
    payload: isLoading
})

export const fatchStudents = () => ({
    type: actionTypes.fatchStudents
})