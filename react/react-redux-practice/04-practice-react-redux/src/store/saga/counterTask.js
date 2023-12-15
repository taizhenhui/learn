
import { delay, put, fork, take, call, race, takeEvery } from 'redux-saga/effects'
import { increase, decrease, actionTypes } from '../actions/counter'


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
        yield take(actionTypes.autoIncrease)
        yield race({
            autoIncrease: call(increaseTask),
            cancel: take(actionTypes.stopAutoIncrease)
        })
    }
}

export default function* () {
    yield fork(autoTask)
    yield takeEvery(actionTypes.asyncIncrease, asyncIncreaseSaga)
    yield takeEvery(actionTypes.asyncDecrease, asyncDecreaseSaga)
}