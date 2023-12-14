export const actionsTypes = {
    increase: 'INCREASE',
    decrease: 'DECREASE'
}

export function increase() {
    return {
        type: actionsTypes.increase
    }
}

export function decrease() {
    return {
        type: actionsTypes.decrease
    }
}