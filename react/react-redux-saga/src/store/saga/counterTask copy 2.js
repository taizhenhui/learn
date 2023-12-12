import { delay, fork, put, take, takeEvery, cancel } from 'redux-saga/effects'
import { actionTypes, increase, decrease } from '../action/counter'
function* asyncIncrease(action) {
    yield delay(2000)
    yield put(increase())
    console.log("asyncIncrease------------");
}
// function* asyncDecrease(action) {
//     let task;
//     while (true) {
//         yield take(actionTypes.asyncDecrease)
//         if(task){
//             yield cancel(task)
//             console.log("cancel 之前的任务被取消掉了");
//         }
//         task = yield fork(function* () {
//             yield delay(2000)
//             yield put(decrease())
//         })
//     }
// }
function* asyncDecrease() {
    yield delay(2000)
    yield put(decrease())
    console.log("asyncDecrease------------");
}
export default function* () {
    yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
    yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
    
    console.log("监听到了async-increase");
} 