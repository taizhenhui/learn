import React, { Component } from 'react'
import types from '../../utils/commonTypes'
import PropTypes from 'prop-types'

import withDataGroup from './withDataGroup'
 class CheckBox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        chooseDatas: types.chooseDatas.isRequired,
        info: types.singleData,
        onChange: PropTypes.func
    }
    handleChange = e => {

        let val = e.target.value
        let newArr
        if (e.target.checked) {
            newArr = [...this.props.chooseDatas, val]
        } else {
            newArr = this.props.chooseDatas.filter(f => f !== val)
        }
        this.props.onChange && this.props.onChange(newArr)
    }
    render() {
        const { info, name, chooseDatas } = this.props
        return (
            <label>
                <input type="checkbox"
                    name={name}
                    value={info.value}
                    checked={chooseDatas.includes(info.value)}
                    onChange={this.handleChange} />
                {info.text}
            </label>
        )
    }
}

export default withDataGroup(CheckBox)