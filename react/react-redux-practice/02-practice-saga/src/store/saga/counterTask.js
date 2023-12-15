
import { delay, put, fork, take, call, race } from 'redux-saga/effects'
import { increase, actionTypes } from '../actions/counter'


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
        yield take(actionTypes.autoIncrease)
        yield race({
            autoIncrease: call(increaseTask),
            cancel: take(actionTypes.stopAutoIncrease)
        })
    }
}

export default function* () {
    yield fork(autoTask)
}