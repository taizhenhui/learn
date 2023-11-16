import React, { PureComponent } from 'react'
import "../style/style.css"
export default class MovablePanel extends PureComponent {
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
                <div style={{
                    width: 100,
                    height: 100,
                    background: "#008c8c",
                    position: "absolute",
                    left: this.state.x - 50,
                    top: this.state.y - 50
                }}></div>
            </div>
        )
    }
}
