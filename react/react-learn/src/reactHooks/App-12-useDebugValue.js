import React, { useState, useEffect, useDebugValue } from 'react'

/*
# DebugValue Hook

useDebugValue：用于将自定义Hook的关联数据显示到调试栏

如果创建的自定义Hook通用性比较高，可以选择使用useDebugValue方便调试
 */


function useTest(){
    const [students, ] = useState([])
    useDebugValue("学生集合")
    return students;
}

export default function App() {
    useState(0)
    useState("abc")
    useEffect(() => {
        console.log("effect")
    }, [])
    useTest();
    return (
        <div>
        </div>
    )
}

