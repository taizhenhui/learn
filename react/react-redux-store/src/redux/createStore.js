import  isPlainObject from './utils/isPlainObject'
import ActionTypes from './utils/ActionTypes'

/**
 * 实现createStore的功能
 * @param {*} reducer reducer
 * @param {*} defaultState  默认的状态值
 */
export default function (reducer, defaultState) {
    let currentReducer = reducer; // 当前使用的reducer
    let currentState = defaultState; // 当前仓库中的状态

    const listeners = []; // 记录所有的监听器(订阅者)

    function dispatch(action) {
        // 验证action
        if (!isPlainObject(action)) {
            throw new TypeError('action must be a plain object')
        }
        if (action.type === undefined) {
            throw new TypeError('action must have a type property')
        }
        currentState = currentReducer(currentState, action)

        for (const listener of listeners) {
            listener()
        }
    }
    function getState() {
        return currentState
    }

    // 添加一个监听器(订阅器) 
    function subscribe(listener) {
        listeners.push(listener)
        let isRemove = false; // 是否已经移除掉了
        return () => {
            if(isRemove) return
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
            isRemove = true
        }
    }
    // 
    dispatch({ type: ActionTypes.INIT() })
    return {
        dispatch,
        getState,
        subscribe
    }
}