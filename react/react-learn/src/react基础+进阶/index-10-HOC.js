import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CheckBox from '../components/hoc/CheckBox'
import RadioBox from '../components/hoc/RadioBox'

/**
# HOC 高阶组件

HOF：Higher-Order Function, 高阶函数，以函数作为参数，并返回一个函数
HOC: Higher-Order Component, 高阶组件，以组件作为参数，并返回一个组件

通常，可以利用HOC实现横切关注点。

> 举例：20个组件，每个组件在创建组件和销毁组件时，需要作日志记录
> 20个组件，它们需要显示一些内容，得到的数据结构完全一致


**注意**

1. 不要在render中使用高阶组件
2. 不要在高阶组件内部更改传入的组件
 */
class Test extends Component {
    state = {
        datas: [
            { value: "football", text: "足球" },
            { value: "basketball", text: "篮球" },
            { value: "movie", text: "电影" },
        ],
        chooseDatas: [],
        sexDatas: [
            { value: "male", text: "男" },
            { value: "female", text: "女" },
        ],
        sexVal: 'male'
    }
    render() {
        return (
            <div>
                <CheckBox
                    name="loves"
                    {...this.state}
                    onChange={newArr => {
                        this.setState({
                            chooseDatas: newArr
                        })
                    }}
                />
                <RadioBox
                    name="sex"
                    datas={this.state.sexDatas}
                    value={this.state.sexVal}
                    onChange={val => {
                        this.setState({
                            sexVal: val
                        })
                    }} />
            </div>
        )
    }
}

ReactDOM.render(<Test />, document.getElementById('root'))
