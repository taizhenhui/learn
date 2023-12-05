export const ADD_USER = Symbol('add-user')
export const DELETE_USER = Symbol('delete-user')
export const UPDATE_USER = Symbol('update-user')


export const createAddUserAction = (user) => ({
    type: ADD_USER,
    payload: user
})

export const createDeleteUserAction = (id) => ({
    type: DELETE_USER,
    payload: id
})

export const createUpdateUserAction = (id, newUser) => ({
    type: UPDATE_USER,
    payload: {...newUser, id}
})
