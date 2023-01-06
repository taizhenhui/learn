import React, { useState } from 'react'
import { Map } from 'immutable'

let obj = {
  name: 'asd',
  age: 100
}
let oldImmuObj = Map(obj)

// 修改
let newImmuObj = oldImmuObj.set('name', 'qwer')
console.log(oldImmuObj, newImmuObj);

// 获取
console.log(oldImmuObj.get('name'), newImmuObj.get('name'));

console.log(oldImmuObj.toJS(), newImmuObj.toJS());
// function App() {
//   const [info, setInfo] = useState(Map({ name: 'ads', age: 100 }))
//   return (
//     <div>
//       <button onClick={() => {
//         setInfo(info.set('name', 'qewr').set('age',18))
//       }}>qewr-18</button>
//       <button onClick={() => {
//         setInfo(info.set('name', 'ads').set('age',100))
//       }}>ads-100</button>
//       <h1>
//         {info.get('name')} -- {info.get('age')}
//       </h1>
//     </div>
//   )
// }
function App() {
  const [info, setInfo] = useState({ name: 'ads', age: 100 })
  return (
    <div>
      <button onClick={() => {
        let obj = Map({name:'qewr',age:18})
        setInfo(obj.toJS())
      }}>qewr-18</button>
      <button onClick={() => {
        let obj = Map({name:'ads',age:100})
        setInfo(obj.toJS())
      }}>ads-100</button>
      <h1>
        {info.name} -- {info.age}
      </h1>
    </div>
  )
}
export default App