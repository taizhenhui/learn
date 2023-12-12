import { delay, fork, put, take, takeEvery, cancel } from 'redux-saga/effects'
import { actionTypes, increase, } from '../action/counter'

let task 
function* autoIncrease() {
    while (true) {
        yield take(actionTypes.autoIncrease)
        if(task){
            yield cancel(task)
        }
        console.log("取消了");
        task = yield fork(function* () {
            while (true) {
                yield delay(1000)
                yield put(increase())
            }
        })

    }
}
export default function* () {
    yield fork(autoIncrease)

    console.log("监听到了autoIncrease");
} 