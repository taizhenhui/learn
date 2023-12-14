// 用于创建仓库，并导出
import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import { createLogger } from 'redux-logger'
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga"
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from "connected-react-router"
import history from "./history"
const sagaMid = createSagaMiddleware(); //创建一个saga的中间件
const logger = createLogger({
    // ...options
    collapsed: true,
});
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMid,
            logger
        )
    ),
)

sagaMid.run(rootSaga); //启动saga任务

export default store;