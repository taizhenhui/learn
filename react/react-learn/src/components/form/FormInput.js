import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './formContext'

export default class FormInput extends Component {
    static defaultProps = {
        type: "text"
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
    }

    static contextType = ctx


    render() {
        const { type, name } = this.props
        return (
            <input
                value={this.context.formData[name] || ""}
                type={type}
                name={name}
                onChange={e => {
                    this.context.changeFormDate && this.context.changeFormDate(name, e.target.value)
                }} />
        )
    }
}
