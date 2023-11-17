import React, { useEffect, useState, useRef  } from 'react'

/*
# Ref Hook

useRef函数：

1. 一个参数：默认值
2. 返回一个固定的对象，```{current: 值}```
 */

// let timer
// export default function App() {
//     const [n, setN] = useState(10)
//     useEffect(() => {
//         if (n === 0) {
//             return
//         }
//         timer = setTimeout(() => {
//             setN(n - 1)
//         }, 1000)
//         return () => {
//             clearTimeout(timer)
//         }

//     }, [n])
//     return (
//         <ul>
//             <h1>{n}</h1>
//         </ul>
//     )
// }

// export default function App() {
//     const [n, setN] = useState(10)
//     const timerRef = useRef()
//     useEffect(() => {
//         if (n === 0) {
//             return
//         }
//         timerRef.current = setTimeout(() => {
//             setN(n - 1)
//         }, 1000)
//         return () => {
//             clearTimeout(timerRef.current)
//         }

//     }, [n])
//     return (
//         <ul>
//             <h1>{n}</h1>
//         </ul>
//     )
// }

export default function App() {
    const [n, setN] = useState(10)
    const nRef = useRef(n); // {current:10}
    useEffect(() => {
        const timer = setInterval(() => {
            nRef.current--;
            setN(nRef.current);
            if(nRef.current === 0){
                clearInterval(timer);
            }
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    return (
        <div>
            <h1>{n}</h1>
        </div>
    )
}
