
import { delay, put, fork, take, call, race, takeEvery } from 'redux-saga/effects'
import { increase, decrease, asyncIncrease, asyncDecrease, stopAutoIncrease, autoIncrease } from '../actions/counter'

function* asyncIncreaseSaga() {
    console.log('asyncIncrease 监听');
    yield delay(1000)
    yield put(increase())

}

function* asyncDecreaseSaga() {
    console.log('asyncDecrease 监听');
    yield delay(1000)
    yield put(decrease())

}

/**
 * 自动增加和停止流程控制
 * 流程：自动增加 -> 停止 -> 自动增加 -> 停止
 */
function* increaseTask() {
    while (true) {
        yield delay(1000)
        yield put(increase())
    }
}

function* autoTask() {
    while (true) {
        yield take(autoIncrease.toString())
        yield race({
            autoIncrease: call(increaseTask),
            cancel: take(stopAutoIncrease.toString())
        })
    }
}

export default function* () {
    yield fork(autoTask)
    yield takeEvery(asyncIncrease.toString(), asyncIncreaseSaga)
    yield takeEvery(asyncDecrease.toString(), asyncDecreaseSaga)
}