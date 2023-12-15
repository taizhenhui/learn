import { all } from 'redux-saga/effects'
import counterTask from "./counterTask";
import studentTask from "./studentTask";

export default function* () {
    // all 接收数组 数组中放生成器 saga会等待所有生成器执行完毕 才会进行下一步处理
    yield all([counterTask(), studentTask()])
}