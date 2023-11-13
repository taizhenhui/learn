import React from 'react'
import PropTypes from 'prop-types'

import '../style/ThreeLayout.css'
ThreeLayout.defaultProps = {
    leftWidth: 200,
    rightWidth: 200,
    minWidth: 800,
    gap:0
}
ThreeLayout.PropTypes = {
    leftWidth: PropTypes.number,
    rightWidth: PropTypes.number,
    minWidth: PropTypes.number,
    gap: PropTypes.number,
    children: PropTypes.node,
    left: PropTypes.node,
    right: PropTypes.node,
}
function ThreeLayout(props) {
    
    return (
        <div className='three-layout' style={{ minWidth: props.minWidth }}>
            <div className="main">
                {props.children}
            </div>
            <div className="aside-left" style={{
                width: props.leftWidth,
                marginRight: props.gap + "px"
            }}>
                {props.left}
            </div>
            <div className="aside-right" style={{
                width: props.rightWidth,
                marginLeft: props.gap + "px"
            }}>
                {props.right}
            </div>
        </div>
    )
}

export default ThreeLayout

