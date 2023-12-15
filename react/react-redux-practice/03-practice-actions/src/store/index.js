import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducer from './actions'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
)
sagaMiddleware.run(rootSaga)
export default store