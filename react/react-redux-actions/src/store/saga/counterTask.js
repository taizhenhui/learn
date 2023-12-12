import { delay, put, takeEvery, fork, take, cancel, cancelled } from 'redux-saga/effects'
import { decrease, increase, asyncIncrease, asyncDecrease, autoIncrease, stopAutoIncrease } from '../action/counter'

function* asyncIncreaseSaga() {
    yield delay(1000);
    yield put(increase())
}

function* asyncDecreaseSaga() {
    yield delay(1000);
    yield put(decrease())
}
function* autoTask() {
    while (true) {
        yield take(autoIncrease.toString())
        const task = yield fork(function* () {
            try {
                while (true) {
                    yield delay(1000)
                    yield put(increase())
                }
            } finally {
                if (yield cancelled()) {
                    console.log("autoTask finally");
                }
            }
        })
        yield take(stopAutoIncrease.toString())
        yield cancel(task)
    }
}
export default function* () {
    yield fork(autoTask)
    yield takeEvery(asyncIncrease.toString(), asyncIncreaseSaga)
    yield takeEvery(asyncDecrease.toString(), asyncDecreaseSaga)
    console.log("正在监听asyncIncrease、asyncDecrease")
}
