
import React, { Component } from 'react'

export default class MyClassComp extends Component {
    constructor(props){
        super(props)
       
    }
    /**
     * 该函数必须返回React元素
     * @returns 
     */
    render() {
        console.log("MyClassComp==>", this.props)
        if(this.props.ui){
            return this.props.ui
        }else if(this.props.obj){
            return (
                <>
                    <p>{this.props.obj.name}</p>
                    <p>{this.props.obj.age}</p>
                </>
            )
        }
        return <h1>这是类组件</h1>
    }
}
