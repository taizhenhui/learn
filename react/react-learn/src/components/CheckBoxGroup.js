import React, { Component } from 'react'

export default class CheckBoxGroup extends Component {

    handleChange = e => {

        let val = e.target.value
        let newArr
        if (e.target.checked) {
            newArr = [...this.props.chooseDatas, val]
        } else {
            newArr = this.props.chooseDatas.filter(f => f !== val)
        }
        this.props.onChange && this.props.onChange(newArr, this.props.name, e)
    }
    getCheckBoxs() {
        return this.props.datas.map(it => (
            <label key={it.value}>
                <input type="checkbox"
                    name={this.props.name}
                    value={it.value}
                    checked={this.props.chooseDatas.includes(it.value)}
                    onChange={this.handleChange} />
                {it.text}
            </label>
        ))
    }
    render() {

        return (
            <div>
                {this.getCheckBoxs()}
            </div>
        )
    }
}
