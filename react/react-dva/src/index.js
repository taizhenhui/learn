
import routerConfig from "./routerConfig";
import dva from "dva";
import counterModel from './models/counter'
import studentsModel from './models/students'
import { createBrowserHistory } from 'history'

// const logger = store => next => action => {
//     console.log('老状态：', store.getState());
//     next(action)
//     console.log('新状态：', store.getState());
//     console.log("");
// }

// 得到一个dva 对象
const app = dva({
    history:  createBrowserHistory(),
    initialState:{
        counter: 100
    },
    onError(err){
        console.log(err);
    },
    // onAction: logger,
    onStateChange(state){
        console.log(state.counter);
    }

});

// 在启动之前定义模型
app.model(counterModel)
app.model(studentsModel)

// 设置跟路由，即启动后，要运行的函数，函数的返回结果会被渲染
// app.router(()=><App />)
app.router(routerConfig)

app.start("#root");