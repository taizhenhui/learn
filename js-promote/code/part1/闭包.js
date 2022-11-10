
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
//   console.log(foo,'11');  // un
//   foo = num
//   console.log(foo,'22'); // 10
//   var foo
// }

// console.log(foo,'33'); //  f
// foo = 1
// console.log(foo,'44'); // 1

function foo1(){
  var a = 1
  console.log('a',a)
  foo2()
}
function foo2(){
  var b = 1
  console.log('b',b)
  foo3()
}
function foo3(){
  var c = 1
  console.log('c',c)
  foo4()
}
function foo4(){
  var d = 1
  console.log('d',d)
  console.log('foo4');
}

foo1()