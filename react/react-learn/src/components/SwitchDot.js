import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/SwitchDot.css'
export default class SwitchDot extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        curIndex: PropTypes.number.isRequired, //当前选中的下标
        onChange: PropTypes.func

    }
    render() {
        let spans = []
        for (let i = 0; i < this.props.total; i++) {
            spans.push(<span
                key={i}
                className={this.props.curIndex === i ? 'active' : ''}
                onClick={() => {
                    this.props.onChange && this.props.onChange(i)
                }}
            ></span>)
        }
        return (
            <div className="dots">
                {spans}
            </div>
        )
    }
}
