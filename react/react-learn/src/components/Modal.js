import React from 'react'
import '../style/Modal.css'
import PropTypes from 'prop-types'

export default function Modal(props) {

    return (
        <div onClick={(e) => {
            if (e.target.className === 'modal') {
                props.onClose()
            }
        }}
            className='modal'
            style={{ background: props.bg }}>
            <div className='modal-center'>
                {props.children}
            </div>
        </div>
    )
}
Modal.defaultProps = {
    bg: "rgba(0,0,0,0.5)"
}
Modal.PropTypes = {
    children: PropTypes.node,
    bg: PropTypes.string,
    onClose: PropTypes.func
}