
import { delay, put, takeEvery } from 'redux-saga/effects'
import { increase, decrease, actionTypes } from '../actions/counter'

function* asyncIncrease() {
    console.log('asyncIncrease 监听');
    // delay 延迟执行指定的毫秒数 【会阻塞】
    yield delay(1000)
    // put 触发一个action，相当于dispatch 一个action 【不会阻塞】
    yield put(increase())

}
function* asyncDecrease() {
    console.log('asyncDecrease 监听');
    yield delay(1000)
    yield put(decrease())

}

export default function* () {
    // takeEvery 一直监听某个action, 当被监听的action被触发时，执行对应的生成器函数 【不会阻塞】
    // takeEvery 永远不会结束当前的生成器
    yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
    yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
}