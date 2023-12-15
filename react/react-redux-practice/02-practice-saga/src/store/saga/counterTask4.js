
import { delay, put, fork, take, cancel, cancelled } from 'redux-saga/effects'
import { increase, actionTypes } from '../actions/counter'


/**
 * 自动增加和停止流程控制
 * 流程：自动增加 -> 停止 -> 自动增加 -> 停止
 */
function* autoTask() {
    while (true) {
        yield take(actionTypes.autoIncrease)
        const task = yield fork(function* () {
            try {
                while (true) {
                    yield delay(1000)
                    yield put(increase())
                }
            }
            finally {
                if (yield cancelled()) {
                    console.log("autoTask finally");
                }
            }
        })
        yield take(actionTypes.stopAutoIncrease)
        yield cancel(task)
    }
}

export default function* () {
    yield fork(autoTask)
}