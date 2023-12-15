
import { delay, put, take } from 'redux-saga/effects'
import { increase, decrease, actionTypes } from '../actions/counter'

export default function* () {
    while (true) {
        // take 只会监听一次 action，yield会得到完整action对象 【会阻塞】
        yield take(actionTypes.asyncIncrease)
        console.log('asyncIncrease 监听');
        // delay 延迟执行指定的毫秒数 【会阻塞】
        yield delay(1000)
        // put 触发一个action，相当于dispatch 一个action 【不会阻塞】
        yield put(increase())

        // 运行完 asyncIncrease 才能监听 asyncDecrease
        yield take(actionTypes.asyncDecrease)
        console.log('asyncDecrease 监听');
        yield delay(1000)
        yield put(decrease())
    }
}