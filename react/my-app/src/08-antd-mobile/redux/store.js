
import { applyMiddleware, combineReducers, createStore,compose } from 'redux'
import TabbarReducer from './reducers/TabbarReducer'
import CityReducer from './reducers/CityReducer'
import CinemaListReducer from './reducers/CinemaListReducer'
import palyActiveKeyReducer from './reducers/palyActiveKeyReducer'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'tai',
  storage,
  whitelist: ['CityReducer']
}
const reducer = combineReducers({
  TabbarReducer,
  CityReducer,
  CinemaListReducer,
  palyActiveKeyReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(reduxThunk, reduxPromise)
//   ));
// const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise))
let store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(reduxThunk, reduxPromise)
));
let persistor = persistStore(store)

export { store, persistor }
// export default store