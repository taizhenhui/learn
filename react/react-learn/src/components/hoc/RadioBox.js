import types from '../../utils/commonTypes'
import PropTypes from 'prop-types'
import withDataGroup from './withDataGroup'

import React, { Component } from 'react'

class RadioBox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        info: types.singleData.isRequired, //当前单选框的value
        value: PropTypes.string.isRequired, //当前选中的value值
        onChange: PropTypes.func
    }
    render() {
        const { info, name, value, onChange } = this.props
        return (
            <label >
                <input type="radio"
                    name={name}
                    value={info.value}
                    checked={value === info.value}
                    onChange={() => {
                        onChange && onChange(info.value)
                    }} />
                {info.text}
            </label>
        )
    }
}


export default withDataGroup(RadioBox)