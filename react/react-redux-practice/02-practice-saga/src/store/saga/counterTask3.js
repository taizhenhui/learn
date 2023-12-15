
import { delay, put, fork, take, cancel, takeEvery } from 'redux-saga/effects'
import { increase, actionTypes } from '../actions/counter'



let task = null
function* autoIncreaseSaga() {
    console.log('任务开启');
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

function* stopAutoIncreaseSaga() {
    yield* stopTask()
}

function* stopTask() {
    if (task) {
        yield cancel(task)
    }
}
export default function* () {
    // fork 用于自动开启一个新的任务。fork函数接收一个生成器函数，返回一个task对象。【不阻塞】
    yield fork(autoIncreaseSaga)
    yield takeEvery(actionTypes.stopAutoIncrease, stopAutoIncreaseSaga)
}