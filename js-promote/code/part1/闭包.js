
// console.log(bar);
// function bar() {
//   console.log('bar--11');
// }
// console.log(bar);
// var bar = function() {
//   console.log('bar--22')
// }
// console.log(bar);
// bar()

// console.log(bar);
// var bar = function() {
//   console.log('bar--22')
// }
// console.log(bar);
// function bar() {
//   console.log('bar--11');
// }
// console.log(bar);
// bar()

// debugger
// foo(10)

// function foo(num) {
//   console.log(foo,'11');  
//   foo = num
//   console.log(foo,'22'); 
//   // var foo
// }

// console.log(foo,'33'); 
// foo = 1
// console.log(foo,'44');

// function foo1(){
//   foo2()
// }
// function foo2(){
//   foo3()
// }
// function foo3(){
//   foo4()
// }
// function foo4(){
//   console.log('foo4');
// }

// foo1()

// function bar() {
//   var b = 'bar'
// }
// function foo() {
//   console.log(b) // undefined
// }
// foo()

// function foo( a = b, b) {
// console.log(`${a},${b}`)
// }
// foo(null ,1)
// function foo(a) {
//   let a
// }
// foo(1)


// function bar() {
//   console.log('1',1)
// }
// debugger
// var bar = function(){
//   console.log('2',2)
// }
// bar()
debugger
function numAdd() {
  let num = 1
  num++
  return () => console.log(num)
}
var getNum = numAdd()
getNum()