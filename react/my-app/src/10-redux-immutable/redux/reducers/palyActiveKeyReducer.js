const palyActiveKeyReducer = (prevState = {
  active: 'nowPlaying',
}, action) => {
  let newState = {...prevState}
  switch (action.type) {
    case 'change-active':
      newState.active = action.value
      return newState
    default:
      return prevState
  }
}

export default palyActiveKeyReducer