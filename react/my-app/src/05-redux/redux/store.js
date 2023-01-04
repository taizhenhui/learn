
import { applyMiddleware, combineReducers, createStore,compose } from 'redux'
import TabbarReducer from './reducers/TabbarReducer'
import CityReducer from './reducers/CityReducer'
import CinemaListReducer from './reducers/CinemaListReducer'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
const reducer = combineReducers({
  TabbarReducer,
  CityReducer,
  CinemaListReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk, reduxPromise)
  ));
// const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise))
export default store