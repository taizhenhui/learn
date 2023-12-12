import {take} from 'redux-saga/effects'
import {actionTypes} from '../action/counter'
export default  function* (){
    console.log('saga 启动了');
    while(true){
        const result = yield take(actionTypes.increase);
        console.log('222', result);
    }
}