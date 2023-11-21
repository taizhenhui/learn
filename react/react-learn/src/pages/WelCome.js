import React, { useEffect, useRef, useState } from 'react'

export default function WelCome() {
    const [time, setTime]  = useState(new Date().toLocaleString())
    const timer = useRef()
    useEffect(()=>{
        timer.current = setTimeout(()=>{
            setTime(new Date().toLocaleString())
        },1000)
        return () => {
            clearTimeout(timer.current)
        }
    })
    return (
        <div>
            <h1>欢迎使用学生管理系统</h1>
            <h4>{time}</h4>
        </div>

    )
}
