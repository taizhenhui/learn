import { delay, fork, put, take, takeLatest, cancel, takeEvery } from 'redux-saga/effects'
import { actionTypes, increase, } from '../action/counter'

let task

function* stopTask(){
    if(task){
        yield cancel(task)
    }
}


function* autoIncrease() {
    while (true) {
        yield take(actionTypes.autoIncrease)
        yield* stopTask()
        task = yield fork(function* () {
            while (true) {
                yield delay(1000)
                yield put(increase())
            }
        })
    }
}

function* stopAutoIncrease(){
    yield* stopTask()
}
export default function* () {
    yield fork(autoIncrease)
    yield takeEvery(actionTypes.stopAutoIncrease, stopAutoIncrease)
    console.log("监听到了autoIncrease");
} 
