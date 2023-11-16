import React from 'react'
import useAllStudents from './reactHooks/myHooks/useAllStudents'
import usePageStudents from './reactHooks/myHooks/usePageStudents'
function Test() {
    const data = usePageStudents(1, 10)
    console.log(data);
    const list = data.list && data.list.map(s => (
        <li key={s.id}>{s.name}</li>
    ))
    return (
        <ul>
            数据总数：{data.total}
            {list}
        </ul>
    )
}
export default function App() {
    return (
        <div>
            <Test />
        </div>
    )
}
