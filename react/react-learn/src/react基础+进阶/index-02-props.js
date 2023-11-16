import React from 'react'
import ReactDOM from 'react-dom'
import MyFuncComp from '../components/MyFuncComp'
import MyClassComp from '../components/MyClassComp'
import StudentList from '../components/StudentList'

/**
    # 组件和组件属性
    组件：包含内容、样式和功能的UI单元

    ## 创建一个组件
    **特别注意：组件的名称首字母必须大写**

    1. 函数组件
    返回一个React元素

    2. 类组件
    必须继承React.Component
    必须提供render函数，用于渲染组件

    ## 组件的属性
    1. 对于函数组件，属性会作为一个对象的属性，传递给函数的参数
    2. 对于类组件，属性会作为一个对象的属性，传递给构造函数的参数
    注意：组件的属性，应该使用小驼峰命名法

    **组件无法改变自身的属性**。
    之前学习的React元素，本质上，就是一个组件（内置组件）
    React中的哲学：数据属于谁，谁才有权力改动
    **React中的数据，自顶而下流动**
 */

function MyFunComp1(props) {
  console.log(props)
  return <h1>組件1内用 -- {props.num}</h1>
}
const stus = [
  {
    address: '辽宁省',
    appkey: 'demo1_1545210570249',
    birth: 1996,
    ctime: 1561389921,
    email: '56550978@qq.com',
    id: 1,
    name: '张山',
    phone: '18715098989',
    sNo: '10011',
    sex: 1,
    utime: 1561472121,
  },
  {
    address: '黑龙江',
    appkey: 'demo2_1545210570249',
    birth: 1997,
    ctime: 1565679921,
    email: '565506666@qq.com',
    id: 2,
    name: '皎月',
    phone: '18715055665',
    sNo: '10012',
    sex: 0,
    utime: 1561581234,
  },
]
const div = (
  <>
    <StudentList stus={stus} />
    {/* {MyFunComp()} */}
    <MyFunComp1 num={1} />
    <MyFunComp1 num="2" />
    <MyFuncComp />
    <MyClassComp num={3} />
    <MyClassComp num={4} ennable={true} />
    <MyClassComp
      obj={{
        name: 'zhangyishan',
        age: 100,
      }}
    />
    <MyClassComp ui={<h3>这是h3元素</h3>} />
  </>
)

ReactDOM.render(div, document.getElementById('root'))
