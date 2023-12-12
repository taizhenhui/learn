import { all } from 'redux-saga/effects'
import counterTask from '../saga/counterTask'
import studentTask from '../saga/studentTask'
export default function* () {
    console.log('saga 启动了');
    const result = yield all([counterTask(), studentTask()]);
    console.log(result);
}