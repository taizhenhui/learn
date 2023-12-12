import { delay, put, takeEvery } from'redux-saga/effects'
import {actionTypes, increase, decrease} from '../action/counter'
function* asyncIncrease(action){
    yield delay(1000)
    yield put(increase())
    console.log("asyncIncrease111", action);
}
function* asyncDecrease(action){
    yield delay(1000)
    yield put(decrease())
    console.log("asyncDecrease111", action);
}
export default function* (){
        yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
        yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
        console.log("监听到了async-increase");
} 