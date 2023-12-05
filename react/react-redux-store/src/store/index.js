import { createStore, bindActionCreators } from "../redux";
import reducer from "./reducer"
import { createAddUserAction, createDeleteUserAction } from "./action/usersAction"


const store = createStore(reducer);


const unListen = store.subscribe(() => {
    console.log("监听器1", store.getState());
})
const actionCreators = {
    addUser:createAddUserAction,
    deleteUser:createDeleteUserAction
}
const bindActions = bindActionCreators(actionCreators, store.dispatch)
// store.dispatch(createAddUserAction({
    // id: 3,
    // name: "abc",
    // age: 10
// }));
bindActions.addUser({
    id: 3,
    name: "abc",
    age: 10
})

console.log('bindActions',bindActions);
console.log(store.getState());
// store.dispatch(createDeleteUserAction(3));
bindActions.deleteUser(3)
unListen(); //取消监听