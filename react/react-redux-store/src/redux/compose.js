

export default function (...funcs) {
    if (funcs.length === 0) {
        return args => args
    } else if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
    // return function (...args) {
    //     let lastReturn = null // 记录上一个函数返回的值
    //     for (let i = funcs.length - 1; i >= 0; i--) {
    //         const func = funcs[i]
    //         lastReturn = i === funcs.length - 1 ? func(...args) : func(lastReturn)

    //     }
    //     return lastReturn
    // }
}