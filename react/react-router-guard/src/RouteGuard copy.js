import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class RouteGuard extends Component {

    componentDidMount() {
        // 添加一个监听事件
        this.unLisent = this.props.history.listen((location, action)=>{
            if(this.props.onChange){
                const prevLocation = this.props.location
                this.props.onChange(prevLocation, location, action, this.unLisent)
            }
        })
        
        // 设置阻塞
        this.props.history.block('要跳转页面吗？')
    }

    componentWillUnmount() {
        this.unLisent()
    }

    render() {
        return this.props.children
    }
}

export default withRouter(RouteGuard)

