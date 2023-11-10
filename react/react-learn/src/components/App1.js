import React, { Component } from 'react'
import OldLifeCycle from './OldLifeCycle'

export default class app extends Component {
    state = {
        number: 1
    }

    render() {
        return (
            <div>
                <OldLifeCycle n={this.state.number} />
                <button onClick={() => {
                    this.setState(state => ({
                        number: state.number + 1
                    }))
                }}>n加1</button>
            </div>
        )
    }
}
