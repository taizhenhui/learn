
import { createStore } from 'redux'

const reducer = (prevState = {
  show: true,
  cityName:'北京'
}, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'hide-tabber':
      return { show: false }
    case 'show-tabber':
      return { show: true }
    default:
      return prevState
  }
}

const store = createStore(reducer)
export default store