import { createStore } from 'redux'
import reducer from './reducer'
import { createAddUserAction } from './action/usersAction'
import uuid from 'uuid'
const store = createStore(reducer)
console.log(store.getState());
// 第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
// 得到一个新的对象，新对象中的属性名与第一个参数的属性名一致
// const boundActions = bindActionCreators(numberActions, store.dispatch)
// boundActions.getIncreaseAction()
// boundActions.getSetAction(100)

// console.log(store.getState());
store.dispatch(createAddUserAction({
    id: uuid(),
    name: '张三',
    age: 18
}))

console.log(store.getState());
