import { fromJS } from "immutable"

const CityReducer = (prevState = {
  cityName:'北京'
}, action) => {
  let newState = fromJS(prevState)
  switch (action.type) {
    case 'change-city':
      return newState.toSet('cityName', action.value)
    default:
      return prevState
  }
}
export default CityReducer