import React, { useMemo, useState } from 'react'

/*
# Memo Hook

用于保持一些比较稳定的数据，通常用于性能优化

**如果React元素本身的引用没有发生变化，一定不会重新渲染**
 */

// class Test extends React.PureComponent {
//     render() {
//         console.log('Test render');
//         return (
//             <>
//                 <h1>{this.props.text}</h1>
//                 <button onClick={this.props.onClick}>改变文本</button>
//             </>
//         )
//     }
// }

// function Parent() {
//     console.log('Parent render');
//     const [txt, setTxt] = useState(1)
//     const [n, setN] = useState(0)
//     const handleClick = useMemo(() => {
//         return () => {
//             setTxt(txt + 1)
//         }
//     }, [txt])
//     return (
//         <div>
//             <Test text={txt} onClick={handleClick} />
//             <input type="number" value={n} onChange={(e) => {
//                 setN(e.target.value)
//             }} />
//         </div>
//     )
// }


function Item(props) {
    return (
        <li>{props.value}</li>
    )
}

export default function App() {
    const [range] = useState({ min: 1, max: 10000 })
    const [n, setN] = useState(0)
    // for (let i = range.min; i <= range.max; i++) {
    //     console.log(i);
    //     list.push(<Item value={i} key={i} />)
    // }
    const list =  useMemo(() => {
        let list = []
        for (let i = range.min; i <= range.max; i++) {
            console.log(i);
            list.push(<Item value={i} key={i} />)
        }
        return list
    }, [range.min, range.max])
    return (
        <ul>
            {list}
            <input type="number" 
                value={n} 
                onChange={(e) => {
                setN(e.target.value)
            }} />
        </ul>
    )
}
