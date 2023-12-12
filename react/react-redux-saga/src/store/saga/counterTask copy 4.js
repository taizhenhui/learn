import { delay, fork, put, take, takeLatest, cancel } from 'redux-saga/effects'
import { actionTypes, increase, } from '../action/counter'

function* autoIncrease() {
    while (true) {
        yield delay(1000)
        yield put(increase())
    }
}
export default function* () {
    yield takeLatest(actionTypes.autoIncrease, autoIncrease)
    console.log("监听到了autoIncrease");
} 
