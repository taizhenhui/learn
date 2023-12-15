export const actionTypes = {
    increase: 'INCREASE',
    decrease: 'DECREASE',
    asyncIncrease: 'ASYNC_INCREASE',
    asyncDecrease: 'ASYNC_DECREASE',
    autoIncrease: 'AUTO_INCREASE',
    stopAutoIncrease: 'STOP_AUTO_INCREASE',
}

export const increase = () => ({
    type: actionTypes.increase
})

export const decrease = () => ({
    type: actionTypes.decrease
})

export const asyncIncrease = () => ({
    type: actionTypes.asyncIncrease
})

export const asyncDecrease = () => ({
    type: actionTypes.asyncDecrease
})

export const autoIncrease = () => ({
    type: actionTypes.autoIncrease
})

export const stopAutoIncrease = () => ({
    type: actionTypes.stopAutoIncrease
})