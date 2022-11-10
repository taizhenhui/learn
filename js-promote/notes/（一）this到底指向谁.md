# this到底指向谁



### 死记硬背的几条规律

关于this的指向，我们先暂且  `”死记硬背“`  以下几条规律 ↓

- 在函数体中，非显示或是隐式地简单调用函数时，在`严格模式`下，函数的this会被绑定到`undefined`上，`非严格模式`则会绑定到 `全局对象 window/global`上。
- 一般使用 new 方法调用构造函数时，构造函数上的this会绑定到新创建的对象（实例）上。
- 一般通过 call、apply、bind 方法显示调用函数时，函数体内的 this 会被绑定到指定参数的对象上。
- 在箭头函数中，this 的指向是由外层（函数或全局）作用域来决定的。



下面根据具体案例来分析this的指向 ↓



### 具体例题分析



##### 例题1：全局环境中的this



来看看代码的运行结果吧！

```js
function f1 (){
  console.log(this)
}
function f2 (){
  'use strict'
  console.log(this)
}

// 结果 
f1() // window
f2() // undefined
```



> 这种情况相对简单、直接，函数在浏览器全局环境中简单调用，非严格模式下 this 指向 window。在严格模式下，this 指向 undefined 。



变异例题来喽！ 来看看代码的运行结果吧！

```js
const foo = {
  bar: 10,
  fn:function(){
    console.log(this)
    console.log(this.bar)
  }
}

let fn1 = foo.fn
fn1()
```



​		这里的this仍然指向window。虽然 fn 函数在 foo 对象中用来作为对象的方法，但是在赋值给 fn1 之后，fn1 仍然在window环境中执行的。因此，以上的代码会输出 window和undefined。其输出结果等价于下面代码

```js
console.log(window)
console.log(window.bar)
```



上面的题目我们变一下形式。 来看看代码的运行结果吧！

```js
const foo = {
  bar: 10,
  fn:function(){
    console.log(this)
    console.log(this.bar)
  }
}

foo.fn()
```

输出结果如下 ↓

```js
{bar:10,fn:f}
10
```

​		这时，this的指向的是最后调用他的对象，在 foo.fn() 语句中，this 指向 foo 对象。请记住，在执行函数时不考虑显示绑定，如果函数中的this是被上一级对象所调用，那么this指向是上一级的对象，否则指向全局环境。 



##### 例题2：上下文对象调用中的this



参考上面的结论，面对“给出以下代码的输出结果” 这样的问题时，我们将不再困惑。运行下代码，最终将会返回 true。

```js
const student = {
  name:'tom',
  fn:function(){
    return this
  }
}
console.log(student.fn() === student) // true
```



当存在复杂调用时。如以下代码中的嵌套关系，this会指向最后调用他的对象，因此会输出 Mike。↓

```js
const person = {
  name:'tom',
  brother:{
    name:'Mike'
    fn:function(){
    	return this.name
 		}
  }
}
console.log(person.brother.fn()) // Mike
```



至此，this的上下文对象调用已经介绍的比较清楚了。我们再看一道高阶的题目： 来看看代码的运行结果吧！

```js
const o1 = {
  text:'o1',
  fn:function(){
    return this.text
  }
}

const o2 = {
  text:'o2',
  fn:function(){
    return o1.fn()
  }
}

const o3 = {
  text:'o3',
  fn:function(){
    var fn = o1.fn
    return fn()
  }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
```

来分析一下

- 第一个最简单，输出 o1 不难理解。
- 第二个 o2.fn() 最终调用的是 o1.fn() ，因此运行结果仍然是 o1。
- 第三个 o3.fn() 通过 var fn = o1.fn 的赋值进行了 “裸奔” 调用，因此这里的this指向window，运行结果是undefined



如果想让console.log(o2.fn()) 输出 o2 。不使用call、apply、bind该怎么做？

```js
const o1 = {
  text:'o1',
  fn:function(){
    return this.text
  }
}

const o2 = {
  text: 'o2',
  fn: o1.fn
  }
}
console.log(o2.fn()) // o2
```

​		以上方法同样应用了那个重要的结论：this 指向最后调用他的对象、在上面代码中，我们提前进行了赋值操作，减函数fn 挂载到o2对象上，fn 最终作为o2对象的方法被调用。



##### 例题3：通过bind、call、apply改变this指向



​		bind、call、apply的区别和用法也是常见的考点。一句话总结，他们都是用来改变相关函数this指向的，但是call和apply是直接进行相关函数调用的；bind不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的this指向，开发者可以手动调用他。call和apply之间只是参数上的设定不同。



用代码来总结的话，以下3段代码是等价的。

```js
const target = {}
fn.call(target, 'arg1', 'arg2')

fn.apply(target, ['arg1', 'arg2'])

fn.bind(target, 'arg1', 'arg2')()
```



bind、call、apply具体用法不再多说了，

下面来看下例题进行分析

```js
const foo = {
  name: 'tom',
  logName: function() {
    console.log(this.name)
  }
}
const bar = {
  name:'mike'
}
console.log( foo.logName.call(bar) )  // nike
```

​		以上代码的执行结果为mike，不难理解。但是对bind、call、apply的高级考查往往需要面试者结合`构造函数`及`组合`来实现继承。



##### 例题4：构造函数和this



关于构造函数和this，我们来看看这道例题 ↓

```js
function Foo() {
	this.bar = "tom"
}
const instance = new Foo()
console.log(instance.bar)  
```

​		执行以上代码将会输出 tom 。但是这样的场景往往伴随着一个问题：`new操作符`调用构造函数时具体做了什么呢？

以下答案（简略版）仅供参考 ↓

1. 创建一个新对象。
2. 将构造函数的this指向这个新的对象。
3. 为这个对象添加属性、方法等。
4. 最终返回新的对象。



上述过程也可以用代码表述。↓

```js
var obj = {}
obj.__proto__ = Foo.prototype
Foo.call(obj)		
```



​		需要指出的是，如果在构造函数中出现了显式 return 的情况，那么需要注意，其可以细分为两种场景。

**场景1**：

> 执行以下代码将输出undefined，此时 instance 返回的是空对象o。

```js
// 场景1
function Foo() {
	this.user = 'tom'
  const o = {}
  return o
}
const instance = new Foo()
console.log(instance.user) // undefined
```



**场景2**：

> 执行以下代码将输出tom，也就是说，instance此时返回的是目标对象实例 this。

```js
// 场景2
function Foo() {
	this.user = 'tom'
  return 1
}
const instance = new Foo()
console.log(instance.user) // tom
```

​		所以，如果构造函数中显式返回一个值，且返回的是一个对象（返回复杂类型），那么 this 就指向这个返回的对象；如果返回的不是一个对象（返回基本类型），那么this仍然指向实例。





##### 例题5：箭头函数中的this

​		介绍例题前，我们先来温习一下相关结论：在箭头函数中，this的指向是由外层（函数或全局）作用域来决定的。

​		下面来看一段示例代码。在这段代码中，this出现在setTimeout()的匿名函数中，因此 this 指向 window 对象(浏览器环境下)。

```js
const foo = {
  fn: function() {
    setTimeout(function(){
      console.log(this)
    })
  }
}
console.log(foo.fn())
```

​		如果需要让this指向这个对象，则可以巧用箭头函数来解决，代码如下↓

```js
const foo = {
  fn: function() {
    setTimeout(() => {
      console.log(this)
    })
  }
}
console.log(foo.fn())  // {fn: ƒ}
```

​		单纯的箭头函数中的this指向问题非常简单，但是如果综合所有情况，并结合this的 `优先级` 进行考查，那么这时this的指向并不容易确定。下面就来学习this优先级的相关知识。



##### 例题6：this的优先级

​	

​		我们常常把通过 call、apply、bind、new 对 this进行绑定的情况称为`显式绑定`，而把根据调用关系确定this指向的情况称为`隐式绑定`。



​		那么显式绑定和隐式绑定谁得优先级更高呢？ 关于这个问题的答案，我们会在接下来的例题中为大家揭晓。

来看下代码吧！  ↓

```js
function foo(a){
  console.log(this.a)
}
const obj1 = {
  a: 1,
  foo: foo
}
const obj2 = {
  a: 2,
  foo: foo
}
obj1.foo.call(obj2) // 2
obj2.foo.call(obj1) // 1
```

输出分别为 2、1，也就是说，call、apply的显式绑定一般来说优先级更高。

下面再来看另一段示例代码。

```js
function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a)
```

​		上述代码通过 `bind` 将 `bar函数`中的this绑定为 obj1对象。执行`bar(2)`后，`obj1.a`值为 2 ，即执行`bar(2)`后，对象为`{a:2}`



​		当再使用bar作为构造函数时，例如执行以下代码，则会输出3。

```js
var baz = new bar(3)
console.log(baz.a) // 3
```

​		bar 函数本身就是通过bind方法构造的函数，其内部已经将this绑定为obj1，当它再次作为构造函数通过new 被调用时，返回的实例就已经与obj1解绑了。也就是说，new绑定修改了bind绑定中的this指向，因此`new`绑定的优先级比`bind`绑定的`更高`。

再来看一下示例，如下 ↓

```js
function foo() {
  return a => {
    console.log('this.a',this.a)
  }
}
const obj1 = {
  a:2
}
const obj2 = {
  a: 3
}

const bar = foo.call(obj1) // 2
bar.call(obj2) // 2
console.log(bar.call(obj2)) // undefined
```

​		以上代码的输出结果为 `2`。由于 foo 中的 this 绑定到了 obj1 上，所以 bar（引用箭头函数）中的 this 也会绑定到 obj1 上，箭头函数的绑定无法被修改。



​		如果将 foo 完全写成如下所示的箭头函数的形式，则会输出 `123`。

```js
var a = 123
const foo = () => a => console.log(this.a)
const obj1 = {
  a:2
}
const obj2 = {
  a: 3
}
const bar = foo.call(obj1)
bar.call(obj2)
```

上述代码中foo 都是箭头函数 所以 `this` 的指向是 `window`，输出是 123

> 如果将上述代码中 第一处变量 a 的声明修改一下，用 `let` 或 `const`  去声明，则输出结果是 `undefined` 。**因为const 和 let 等声明的变量不会挂载到 window 全局对象上。**





### 总结

​		我们看到this的用法纷繁多象，确实不容易彻底掌握。例题覆盖了很多场景，需要我们慢慢消化和吸收。只有 `”记死 “`，才能 `“活用”` 。

