import { createStore, applyMiddleware } from 'redux'
import reducer from "./action"
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMid = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMid, logger))

sagaMid.run(rootSaga) // 启动saga任务


export default store