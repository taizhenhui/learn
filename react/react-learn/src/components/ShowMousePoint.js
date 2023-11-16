import React, { PureComponent } from 'react'

export default class ShowMousePoint extends PureComponent {
    divRef = React.createRef()
    state = {
        x: 0,
        y: 0
    }
    handleMouseMove = (e) => {
        const { left, top } = this.divRef.current.getBoundingClientRect();
        this.setState({
            x: e.clientX - left,
            y: e.clientY - top
        })
    }
    render() {
        return (
            <div className='point' ref={this.divRef} onMouseMove={this.handleMouseMove}>
                鼠标位置 X: {this.state.x} - Y: {this.state.y}
            </div>
        )
    }
}
