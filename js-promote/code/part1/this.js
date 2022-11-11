// function Foo() {
// 	this.bar = "tom"
// }
// const instance = new Foo()
// console.log(instance.bar)

// function Foo() {
//   this.user = 'tom'
//   const o = {}
//   return o
// }
// const instance = new Foo()
// console.log(instance.user)

// function Foo() {
// 	this.user = 'tom'
//   return 1
// }
// const instance = new Foo()
// console.log(instance.user)
// console.log(window);
// const foo = {
//   fn: function() {
//     setTimeout(function(){
//       console.log(this)
//     })
//   }
// }
// foo.fn()
// console.log(foo.fn())

// function foo(a){
//   console.log(this.a)
// }
// const obj1 = {
//   a: 1,
//   foo: foo
// }
// const obj2 = {
//   a: 2,
//   foo: foo
// }
// obj1.foo.call(obj2) // 2
// obj2.foo.call(obj1) // 1

// function foo (a) {
//   this.a = a
// }
// const obj1 = {}
// var bar = foo.bind(obj1)
// bar(2)
// console.log(bar);
// console.log(obj1.a)

// function foo (a) {
//   this.a = a
// }
// const obj1 = {}
// var bar = foo.bind(obj1)
// // bar(2)
// console.log(obj1.a)
// console.log(bar,'bar');
// var baz = new bar(3)
// console.log(baz.a) // 3
// console.log(obj1)

// function foo() {
//   return a =>{
//     console.log('this.a',this.a)
//   }
// }
// const obj1 = {
//   a:2
// }
// const obj2 = {
//   a: 3
// }

// const bar = foo.call(obj1)

// bar.call(obj2)
// console.log('bar.call(obj2)',bar.call(obj2))


// let a = 13

// const foo = () => a => {
//   console.log(this.a)
//   console.log(this)
// }

// const obj1 = {
//   a:2
// }
// const obj2 = {
//   a: 3
// }

// const bar = foo.call(obj1)
// bar.call(obj2)

// const o1 = {
//   text:'o1',
//   fn:function(){
//     return this.text
//   }
// }

// const o2 = {
//   text:'o2',
//   fn:function(){
//     return o1.fn()
//   }
// }

// const o3 = {
//   text:'o3',
//   fn:function(){
//     var fn = function(){
//       console.log(this);
//       return this.text
//     }
//     return fn()
//   }
// }

// console.log(o1.fn()) // o1
// console.log(o2.fn()) // o1
// console.log(o3.fn()) // undefined

// 场景1
// function Foo() {
// 	this.user = 'tom'
//   const o = []
//   return o
// }
// const instance = new Foo()
// console.log(instance.user) // undefined

debugger

function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a)

