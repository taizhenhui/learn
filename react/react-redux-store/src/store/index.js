import { createStore, bindActionCreators, applyMiddleware } from "../redux";
import reducer from "./reducer"
import { createAddUserAction, createDeleteUserAction } from "./action/usersAction"

/**
 * 一个中间件函数
 * @param {*} store 
 */
// function logger1(store) {
//     console.log('logger1');
//     return (next) => {
//         return (action) => {
//             console.log("中间件1---------------------")
//             console.log("旧数据1", store.getState());
//             console.log("action1", action);
//             next(action);
//             console.log("新数据1", store.getState());
//             console.log("");
//         }
//     }

// }
// function logger2(store) {
//     console.log('logger2');
//     return (next) => {
//         return (action) => {
//             console.log("中间件2---------------------")
//             console.log("旧数据2", store.getState());
//             console.log("action2", action);
//             next(action);
//             console.log("新数据2", store.getState());
//             console.log("");
//         }
//     }
// }

const logger1 = store => next => action => {
    console.log("中间件1---------------------")
    console.log("旧数据1", store.getState());
    console.log("action1", action);
    next(action);
    console.log("新数据1", store.getState());
    console.log("");
}
const logger2 = store => next => action => {
    console.log("中间件2---------------------")
    console.log("旧数据2", store.getState());
    console.log("action2", action);
    next(action);
    console.log("新数据2", store.getState());
    console.log("");
}

// 应用中间件 方式1
const store = createStore(reducer, applyMiddleware(logger1, logger2));
// 应用中间件 方式2
// const store = applyMiddleware(logger1, logger2)(createStore)(reducer)


// const unListen = store.subscribe(() => {
//     console.log("监听器", store.getState());
// })
const actionCreators = {
    addUser: createAddUserAction,
    deleteUser: createDeleteUserAction
}
const bindActions = bindActionCreators(actionCreators, store.dispatch)
bindActions.addUser({
    id: 3,
    name: "abc",
    age: 10
})

// console.log(store.getState());
// bindActions.deleteUser(3)
// unListen(); //取消监听