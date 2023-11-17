import React, { useCallback, useState } from 'react'

/*
# Callback Hook

函数名：useCallback

用于得到一个固定引用值的函数，通常用它进行性能优化

useCallback:

该函数有两个参数：

1. 函数，useCallback会固定该函数的引用，只要依赖项没有发生变化，则始终返回之前函数的地址
2. 数组，记录依赖项

该函数返回：引用相对固定的函数地址
 */

class Test extends React.PureComponent {
    render() {
        console.log('Test render');
        return (
            <>
                <h1>{this.props.text}</h1>
                <button onClick={this.props.onClick}>改变文本</button>
            </>
        )
    }
}

function Parent() {
    console.log('Parent render');
    const [txt, setTxt] = useState(1)
    const [n, setN] = useState(0)
    const handleClick = useCallback(() => {
        setTxt(txt + 1)
    }, [txt])
    return (
        <div>
            <Test text={txt} onClick={handleClick} />
            <input type="number" value={n} onChange={(e) => {
                setN(e.target.value)
            }} />
        </div>
    )
}

export default function App() {
    return (
        <div>
            <Parent />
        </div>
    )
}
