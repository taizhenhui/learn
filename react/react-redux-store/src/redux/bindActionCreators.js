
/**
 * 
 * @param {*} actionCreators 
 * @param {*} dispatch 
 */
export default function (actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return getAutoDispatchActionCreator(actionCreators, dispatch)
    } else if (typeof actionCreators === 'object') {
        const result = {}
        for (const key in actionCreators) {
            if (Object.hasOwnProperty.call(actionCreators, key)) {
                const actionCreator = actionCreators[key];
                if(typeof actionCreator === 'function'){
                    result[key] = getAutoDispatchActionCreator(actionCreator, dispatch)
                }
            }
        }
        return result
    } else {
        throw new TypeError('actionCreators must be a function or an object')
    }
}

/**
 * 得到一个自动分发的action创建的函数
 * @param {*} actionCreator 
 * @param {*} dispatch 
 * @returns 
 */

function getAutoDispatchActionCreator(actionCreator, dispatch) {
    return (...args) => {
        const action = actionCreator(...args)
        dispatch(action)
    }
}