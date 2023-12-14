import { createStore } from 'redux'
import reducer from './reducer'
import { applyMiddleware } from 'redux'
import {createLogger} from'redux-logger'

const logger = createLogger({
    collapsed: false,
})
const store = createStore(
    reducer,
    applyMiddleware(logger)
)
export default store