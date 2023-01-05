const CinemaListReducer = (prevState = {
  list: [],
}, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'change-list':
      newState.list = action.value
      return newState
    default:
      return prevState
  }
}

export default CinemaListReducer