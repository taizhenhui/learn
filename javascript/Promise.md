> 本节课的任务：
>
> 1. 理解Promise A+规范的基本概念
> 2. 学会创建Promise
> 3. 学会针对Promise进行后续处理

# 邓哥的烦恼

邓哥心中有很多女神，他今天下定决心，要向这些女神表白，他认为，只要女神够多，根据概率学原理，总有一个会接收他

稳妥起见，邓哥决定使用**串行**的方式进行表白：先给第1位女神发送短信，然后等待女神的回应，如果成功了，就结束，如果失败了，则再给第2位女神发送短信，依次类推

![image-20210618150543263](http://mdrs.yuanjin.tech/img/20210618150543.png)

邓哥的女神一共有4位，名字分别是：李建国、王富贵、周聚财、刘人勇

发短信是一个重复性的劳动，邓哥是个程序员，因此决定用函数封装这个动作

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name, onFulffiled, onRejected) {
  // 模拟 发送表白短信
  console.log(
    `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
  );
  console.log(`等待${name}回复......`);
  // 模拟 女神回复需要一段时间
  setTimeout(() => {
    // 模拟 有10%的几率成功
    if (Math.random() <= 0.1) {
      // 成功，调用 onFuffiled，并传递女神的回复
      onFulffiled(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
    } else {
      // 失败，调用 onRejected，并传递女神的回复
      onRejected(`${name} -> 邓哥：你是个好人😜`);
    }
  }, 1000);
}
```

有了这个函数后，邓哥于是开始编写程序发送短信了

```js
// 首先向 李建国 发送消息
sendMessage(
  '李建国',
  (reply) => {
    // 如果成功了，输出回复的消息后，结束
    console.log(reply);
  },
  (reply) => {
    // 如果失败了，输出回复的消息后，向 王富贵 发送消息
    console.log(reply);
    sendMessage(
      '王富贵',
      (reply) => {
        // 如果成功了，输出回复的消息后，结束
        console.log(reply);
      },
      (reply) => {
        // 如果失败了，输出回复的消息后，向 周聚财 发送消息
        console.log(reply);
        sendMessage(
          '周聚财',
          (reply) => {
            // 如果成功了，输出回复的消息后，结束
            console.log(reply);
          },
          (reply) => {
            // 如果失败了，输出回复的消息后，向 刘人勇 发送消息
            console.log(reply);
            sendMessage(
              '刘人勇',
              (reply) => {
                // 如果成功了，输出回复的消息后，结束
                console.log(reply);
              },
              (reply) => {
                // 如果失败了，就彻底没戏了
                console.log(reply);
                console.log('邓哥命犯天煞孤星，注定孤独终老！！');
              }
            );
          }
        );
      }
    );
  }
);
```

该程序完成后，邓哥内心是崩溃的

这一层一层的回调嵌套，形成了传说中的「**回调地狱 callback hell**」

邓哥是个完美主义者，怎么能忍受这样的代码呢？

要解决这样的问题，需要Promise出马

# Promise规范

Promise是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使异步代码更加清晰、简洁、统一

这套规范最早诞生于前端社区，规范名称为[Promise A+](https://promisesaplus.com/)

该规范出现后，立即得到了很多开发者的响应

Promise A+ 规定：

1. 所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个**对象**，该对象称之为**Promise对象**，也叫做任务对象

   <img src="http://mdrs.yuanjin.tech/img/20210618154556.png" alt="image-20210618154556558" style="zoom:50%;" />

2. 每个任务对象，都应该有两个阶段、三个状态

   <img src="http://mdrs.yuanjin.tech/img/20210618155145.png" alt="image-20210618155145355" style="zoom:50%;" />

   根据常理，它们之间存在以下逻辑：

   - 任务总是从未决阶段变到已决阶段，无法逆行
   - 任务总是从挂起状态变到完成或失败状态，无法逆行
   - 时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变

3. `挂起->完成`，称之为`resolve`；`挂起->失败`称之为`reject`。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。

   ![image-20210618160538875](http://mdrs.yuanjin.tech/img/20210618160538.png)

4. 可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected

   ![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

# Promise API

ES6提供了一套API，实现了Promise A+规范

基本使用如下：

```js
// 创建一个任务对象，该任务立即进入 pending 状态
const pro = new Promise((resolve, reject) => {
  // 任务的具体执行流程，该函数会立即被执行
  // 调用 resolve(data)，可将任务变为 fulfilled 状态， data 为需要传递的相关数据
  // 调用 reject(reason)，可将任务变为 rejected 状态，reason 为需要传递的失败原因
});

pro.then(
  (data) => {
    // onFulfilled 函数，当任务完成后，会自动运行该函数，data为任务完成的相关数据
  },
  (reason) => {
    // onRejected 函数，当任务失败后，会自动运行该函数，reason为任务失败的相关原因
  }
);
```

# 邓哥的解决方案

学习了ES6的Promise后，邓哥决定对`sendMessage`函数进行改造，改造结果如下：

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// 该函数返回一个任务对象
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 resolve，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 reject，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}
```

之后，就可以使用该函数来发送消息了

```js
sendMessage('李建国').then(
  (reply) => {
    // 女神答应了，输出女神的回复
    console.log(reply);
  },
  (reason) => {
    // 女神拒绝了，输出女神的回复
    console.log(reason);
  }
);
```

> 至此，回调地狱的问题仍然没能解决
>
> 要解决回调地狱，还需要进一步学习Promise的知识





![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)



# catch方法

```
.catch(onRejected)` = `.then(null, onRejected)
```

# 链式调用

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

由于链式任务的存在，异步代码拥有了更强的表达力

```js
// 常见任务处理代码

/*
 * 任务成功后，执行处理1，失败则执行处理2
 */
pro.then(处理1).catch(处理2)

/*
 * 任务成功后，依次执行处理1、处理2
 */
pro.then(处理1).then(处理2)

/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```

# 邓哥的解决方案

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

sendMessage('李建国')
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('王富贵');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('周聚财');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('刘人勇');
  })
  .then(
    (reply) => {
      // 成功，结束
      console.log(reply);
      console.log('邓哥终于找到了自己的伴侣');
    },
    (reply) => {
      // 最后一个也失败了
      console.log(reply);
      console.log('邓哥命犯天煞孤星，无伴终老，孤独一生');
    }
  );
```







# 邓哥的新问题

邓嫂出门时，给邓哥交待了几个任务：

1. 做饭

   可交给电饭煲完成

2. 洗衣服

   可交给洗衣机完成

3. 打扫卫生

   可交给扫地机器人完成

邓哥需要在所有任务结束后给邓嫂汇报工作，哪些成功了，哪些失败了

为了最大程度的节约时间，邓哥希望这些任务同时进行，最终汇总结果统一处理

<img src="http://mdrs.yuanjin.tech/img/20210621142519.png" alt="image-20210621142519937" style="zoom:50%;" />

每个任务可以看做是一个返回Promise的函数

```js
// 做饭
function cook() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了电饭煲');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('饭已ok');
      } else {
        reject('做饭却忘了加水，米饭变成了爆米花');
      }
    }, 2000);
  });
}

// 洗衣服
function wash() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了洗衣机');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('衣服已经洗好');
      } else {
        reject('洗衣服时停水了，洗了个寂寞');
      }
    }, 2500);
  });
}

// 打扫卫生
function sweep() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了扫地机器人');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('地板扫的非常干净');
      } else {
        reject('扫地机器人被哈士奇一爪掀翻了');
      }
    }, 3000);
  });
}

```

如何利用这三个函数实现邓哥的要求呢？

# Promise的静态方法

| 方法名                       | 含义                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                   |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                   |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |
|                              |                                                              |

# 邓哥的解决方案

```js
Promise.allSettled([cook(), wash(), sweep()]).then((result) => {
  // 处理汇总结果
  const report = result
    .map((r) => (r.status === 'fulfilled' ? r.value : r.reason))
    .join(';');
  console.log(report);
});
```





![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

# 消除回调

有了Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES官方就可以对其进一步优化

ES7推出了两个关键字`async`和`await`，用于更加优雅的表达Promise

## async

async关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

## await

`await`关键字表示等待某个Promise完成，**它必须用于`async`函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

`await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```



# 邓哥表白的完美解决方案

邓哥的女神可不是只有4位，而是40位！

为了更加方便的编写表白代码，邓哥决定把这40位女神放到一个数组中，然后利用async和await轻松完成代码

```js
// 女神的名字数组
const beautyGirls = [
  '梁平',
  '邱杰',
  '王超',
  '冯秀兰',
  '赖军',
  '顾强',
  '戴敏',
  '吕涛',
  '冯静',
  '蔡明',
  '廖磊',
  '冯洋',
  '韩杰',
  '江涛',
  '文艳',
  '杜秀英',
  '丁艳',
  '邓静',
  '江刚',
  '乔刚',
  '史平',
  '康娜',
  '袁磊',
  '龙秀英',
  '姚静',
  '潘娜',
  '萧磊',
  '邵勇',
  '李芳',
  '谭芳',
  '夏秀英',
  '程娜',
  '武杰',
  '崔军',
  '廖勇',
  '崔强',
  '康秀英',
  '余磊',
  '邵勇',
  '贺涛',
];

// 向某位女生发送一则表白短信
// name: 女神的姓名
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

// 批量表白的程序
async function proposal() {
  let isSuccess = false;
  for (const girl of beautyGirls) {
    try {
      const reply = await sendMessage(girl);
      console.log(reply);
      console.log('表白成功!');
      isSuccess = true;
      break;
    } catch (reply) {
      console.log(reply);
      console.log('表白失败');
    }
  }
  if (!isSuccess) {
    console.log('邓哥注定孤独一生');
  }
}
proposal();
```









# 面试题考点

## Promise的基本概念

![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

## 链式调用规则

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

## Promise的静态方法

| 方法名                       | 含义                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                   |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                   |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |
|                              |                                                              |

## async和await

有了Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES官方就可以对其进一步优化

ES7推出了两个关键字`async`和`await`，用于更加优雅的表达Promise

### async

async关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

### await

`await`关键字表示等待某个Promise完成，**它必须用于`async`函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

`await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```

## 事件循环

根据目前所学，进入事件队列的函数有以下几种：

- `setTimeout`的回调，宏任务（macro task）
- `setInterval`的回调，宏任务（macro task）
- Promise的`then`函数回调，**微任务**（micro task）
- `requestAnimationFrame`的回调，宏任务（macro task）
- 事件处理函数，宏任务(macro task)

# 面试题

1. 下面代码的输出结果是什么

   ```js
   const promise = new Promise((resolve, reject) => {
       console.log(1); 
       resolve(); 
       console.log(2);
   })
   
   promise.then(() => {
       console.log(3);
   })
   
   console.log(4);
   ```

2. 下面代码的输出结果是什么

   ```js
   const promise = new Promise((resolve, reject) => {
       console.log(1); 
       setTimeout(()=>{
         console.log(2)
         resolve(); 
        console.log(3);
       })
   })
   
   promise.then(() => {
       console.log(4);
   })
   
   console.log(5);
   ```

3. 下面代码的输出结果是什么

   ```js
   const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve()
     }, 1000)
   })
   const promise2 = promise1.catch(() => {
     return 2;
   })
   
   console.log('promise1', promise1) 
   console.log('promise2', promise2) 
   
   setTimeout(() => {
     console.log('promise1', promise1) 
     console.log('promise2', promise2) 
   }, 2000)
   ```

4. 下面代码的输出结果是什么

   ```js
   async function m(){
     const n = await 1;
     console.log(n);
   }
   
   m();
   console.log(2);
   ```

5. 下面代码的输出结果是什么

   ```js
   async function m(){
     const n = await 1;
     console.log(n);
   }
   
   (async ()=>{
     await m();
     console.log(2);
   })();
   
   console.log(3);
   ```

   

6. 下面代码的输出结果是什么

   ```js
   async function m1(){
     return 1;
   }
   
   async function m2(){
     const n = await m1();
     console.log(n)
     return 2;
   }
   
   async function m3(){
     const n = m2();
     console.log(n);
     return 3;
   }
   
   m3().then(n=>{
     console.log(n);
   });
   
   m3();
   
   console.log(4);
   ```

7. 下面代码的输出结果是什么

   ```js
   Promise.resolve(1) 
     .then(2)
     .then(Promise.resolve(3))
     .then(console.log)
   ```

8. 下面代码的输出结果是什么

   ```js
   var a;
   var b = new Promise((resolve, reject) => {
     console.log('promise1');
     setTimeout(()=>{
       resolve();
     }, 1000);
   }).then(() => {
     console.log('promise2');
   }).then(() => {
     console.log('promise3');
   }).then(() => {
     console.log('promise4');
   });
   
   a = new Promise(async (resolve, reject) => {
     console.log(a);
     await b;
     console.log(a);
     console.log('after1');
     await a
     resolve(true);
     console.log('after2');
   });
   
   console.log('end');
   ```

9. 下面代码的输出结果是什么

   ```js
   async function async1() {
       console.log('async1 start');
       await async2();
       console.log('async1 end');
   }
   async function async2() {
    console.log('async2');
   }
   
   console.log('script start');
   
   setTimeout(function() {
       console.log('setTimeout');
   }, 0)
   
   async1();
   
   new Promise(function(resolve) {
       console.log('promise1');
       resolve();
   }).then(function() {
       console.log('promise2');
   });
   console.log('script end');
   ```

   
