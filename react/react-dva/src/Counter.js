import React, { useRef } from 'react'
import { connect } from 'dva'

function Counter(props) {
    const inputRef = useRef()

    return (
        <div>
            <h1>{props.number}</h1>
            <button onClick={props.onAsyncIncrease} >异步 + 1</button>
            <button onClick={props.onIncrease} >+ 1</button>
            <button onClick={props.onAsyncDecrease} >异步 - 1</button>
            <button onClick={props.onDecrease} >- 1</button>
            <p>
                <input type="number" ref={inputRef} />
                <button onClick={()=>{
                    const n = parseInt(inputRef.current.value)
                    props.onAdd(n)
                }}>加上</button>
            </p>
        </div>
    )
}

let mapStateToProps = state => ({ number: state.counter })

let mapDispatchToProps = dispatch => ({
    onAsyncIncrease: () => dispatch({ type: 'counter/asyncIncrease' }),
    onIncrease: () => dispatch({ type: 'counter/increase' }),
    onAsyncDecrease: () => dispatch({ type: 'counter/asyncDecrease' }),
    onDecrease: () => dispatch({ type: 'counter/decrease' }),
    onAdd: n => dispatch({ type: 'counter/add', payload: n }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
