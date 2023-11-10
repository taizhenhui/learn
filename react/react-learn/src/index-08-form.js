import React from 'react'
import ReactDOM from 'react-dom'
/**
# 表单

受控组件和非受控组件

受控组件：组件的使用者，有能力完全控制该组件的行为和内容。
通常情况下，受控组件往往没有自身的状态，其内容完全收到属性的控制。

非受控组件：组件的使用者，没有能力控制该组件的行为和内容，组件的行为和内容完全自行控制。

**表单组件，默认情况下是非受控组件，一旦设置了表单组件的value属性，则其变为受控组件(单选和多选框需要设置checked)**
 */

import { Component } from 'react'

class FromComp extends Component {
    state = {
        loves: ['篮球', '足球', '乒乓球', '其他'],
        chooseLoves: ['足球', '其他'],
        selVal: 'beijing'
    }
    render() {
        return (
            <div>
                {
                    this.state.loves.map(it => (<label key={it}><input type="checkbox"
                        checked={
                            this.state.chooseLoves.includes(it)
                        }
                        onChange={
                            e => {
                                if (e.target.checked) {
                                    this.setState({
                                        chooseLoves: [...this.state.chooseLoves, it]
                                    })
                                } else {
                                    this.setState({
                                        chooseLoves: this.state.chooseLoves.filter(f => f !== it)
                                    })

                                }
                            }
                        } />
                        {it}
                    </label>))
                }

                <br />

                <select name="" id=""
                    value={this.state.selVal}
                    onChange={e => {
                        this.setState({
                            selVal: e.target.value
                        })
                    }}>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="shenyang">沈阳</option>
                </select>

            </div>
        )
    }
}

class FormTest extends Component {
    state = {
        loginId: "",
        loginPwd: "",
        sex: "male",
        chooseLoves: [],
        loves: [
            { value: "football", text: "足球" },
            { value: "basetball", text: "篮球" },
            { value: "movie", text: "电影" },
            { value: "music", text: "音乐" },
            { value: "other", text: "其他" },
        ],
        city: "beijing"
    }
    handleChange = e => {
        let val = e.target.value
        let name = e.target.name
        let type = e.target.type
        if (type === 'checkbox') {
            if (e.target.checked) {
                this.setState({
                    chooseLoves: [...this.state.chooseLoves, val]
                })
            } else {
                this.setState({
                    chooseLoves: this.state.chooseLoves.filter(l => l !== val)
                })
            }
        } else {
            this.setState({
                [name]: val
            })
        }
    }
    getLoveCheckBoxes() {
        const bs = this.state.loves.map(it => (
            <label key={it.value}>
                {it.text}
                <input
                    type="checkbox"
                    value={it.value}
                    checked={this.state.chooseLoves.includes(it.value)}
                    onChange={this.handleChange} />
            </label>
        ))
        return bs
    }
    render() {
        return (
            <div>
                <p> 账号：
                    <input type="text" name="loginId" value={this.state.loginId} onChange={this.handleChange} />
                </p>

                <p> 密码：
                    <input type="password" name="loginPwd" value={this.state.loginPwd} onChange={this.handleChange} />
                </p>

                <p> 性别：
                    <label htmlFor="">男
                        <input type="radio" name="sex" value="male" checked={this.state.sex === 'male'} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="">女
                        <input type="radio" name="sex" value="female" checked={this.state.sex === 'female'} onChange={this.handleChange} />
                    </label>
                </p>

                <p> 城市：
                    <select name="city" id="" value={this.state.city} onChange={this.handleChange}>
                        <option value="beijing">北京</option>
                        <option value="shanghai">上海</option>
                        <option value="shenyang">沈阳</option>
                    </select>
                </p>
                <p> 爱好：
                    {this.getLoveCheckBoxes()}
                </p>
                <p>
                    <button onClick={() => {
                        console.log(this.state);
                    }}>获取表单数据</button>
                </p>
            </div>
        )
    }
}

const div = (
    <>
        <FromComp></FromComp>
        <FormTest></FormTest>
    </>
)

ReactDOM.render(div, document.getElementById('root'))
