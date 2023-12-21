export default {
    namespace: 'counter', // 命名空间
    state: 10,
    reducers: {
        // fun-name: (state, action) => {}
        increase: state => state + 1,
        decrease: state => state - 1,
        add: (state, { payload }) => state + payload,
    },
    effects: {
        // *fun-name: (action, { put, call, select }) => {}
        *asyncIncrease(action, { put, call }) {
            console.log(action);
            yield call(delay, 1500)
            // throw new Error('error 报错了');
            console.log('异步 +');
            yield put({ type: 'increase' });
        },
        *asyncDecrease(action, { put, call }) {
            yield call(delay, 1500)
            console.log('异步 -');
            yield put({ type: 'decrease' });
        },
    },
    subscriptions: {
        resizeIncrease({ dispatch }) {
            window.onresize = () => {
                console.log('窗口大小改变');
                dispatch({ type: 'increase' });
            }
        },
        resizeDecrease({ dispatch, history }) {
            history.listen(() => {
                console.log('监听');
                dispatch({ type: 'decrease' });
            })
        }
    }
}

function delay(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}