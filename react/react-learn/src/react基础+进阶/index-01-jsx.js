import React from 'react'
import ReactDOM from 'react-dom'
// # JSX

// ## 什么是JSX

// - Facebook起草的JS扩展语法
// - 本质是一个JS对象，会被babel编译，最终会被转换为React.createElement
// - 每个JSX表达式，有且仅有一个根节点
//   - React.Fragment
// - 每个JSX元素必须结束（XML规范）

// ## 在JSX中嵌入表达式

// - 在JSX中使用注释
// - 将表达式作为内容的一部分
//   - null、undefined、false不会显示
//   - 普通对象，不可以作为子元素
//   - 可以放置React元素对象
// - 将表达式作为元素属性
// - 属性使用小驼峰命名法
// - 防止注入攻击
//   - 自动编码
//   - dangerouslySetInnerHTML

// ## 元素的不可变性

// - 虽然JSX元素是一个对象，但是该对象中的所有属性不可更改
// - 如果确实需要更改元素的属性，需要重新创建JSX元素

const a = 100,
  b = 20
const obj = {
  name: 'zhangsan',
  age: 15,
}
const ele = <span>这是一个span元素</span>
const arr = [1, 2, 3, 4, 5]
const numbers = new Array(5)
numbers.fill(0)
const list = numbers.map((item, i) => <li key={i}>{i}</li>)
const url = 'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF'
const imgBox = (
  <div>
    <img
      className="img-sty"
      style={{
        marginLeft: '50px',
        width:"300px",
        border:"10px solid pink"
      }}
      src={url}
      alt=""
    />
  </div>
)

const content = "<h1>dsafasdfasdf</h1><p>手動閥手動閥手動閥</p>"
const div = (
  <>
    <h1>
      {a}*{b} = {a * b}
    </h1>
    <p>
      {/* 这是jsx的注释 */}
      {null}
      {undefined}
      {false}
      {0}-{' '}-{0}
      {obj.name}-{obj.age}
    </p>
    <p>{ele}</p>
    <p>{arr}</p>
    <p>{list}</p>
    {imgBox}
    <p>{content}</p>
    <p dangerouslySetInnerHTML={{__html:content}}></p>
  </>
)

ReactDOM.render(div, document.getElementById('root'))
