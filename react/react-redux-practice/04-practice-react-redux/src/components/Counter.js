import React from 'react'
import { increase, decrease, asyncDecrease, asyncIncrease } from '../store/actions/counter'
import { connect } from 'react-redux'

function Counter(props) {

    return (
        <div>
            <h1>{props.number}</h1>
            <p>
                <button onClick={() => props.onAsyncIncrease()}>异步加 + 1</button>
                <button onClick={() => props.onIncrease()}>加 + 1</button>
                <button onClick={() => props.onAsyncDecrease()}>异步减 - 1</button>
                <button onClick={() => props.onDecrease()}>减 - 1</button>
            </p>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        number: state.counter
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onIncrease: () => dispatch(increase()),
        onDecrease: () => dispatch(decrease()),
        onAsyncIncrease: () => dispatch(asyncIncrease()),
        onAsyncDecrease: () => dispatch(asyncDecrease())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)