import compose from "./compose"

/**
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */
export default function (...middlewares) {
    return (createStore) => { // 创建仓库的函数
        return (reducer, defaultState) => {
            const store = createStore(reducer, defaultState)
            let dispatch = () => {
                throw new TypeError('目前不能使用dispatch')
            }
            const simpleStore = {
                getState: store.getState,
                dispatch:  store.dispatch
            }
            const dispatchProducers = middlewares.map(mid => mid(simpleStore))
            dispatch = compose(...dispatchProducers)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}