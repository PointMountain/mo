## JS的数据类型
原始类型
number boolean string symbol undefined null bigint
引用类型
Object Function
- typeof 只能判断非null的原始类型和Function
- instanceof 内部通过原型链的方式来判断是否为构建函数的实例
  ```js
  // 手写instanceof
  function myInstanceof(left, right) {
    let pro = left.__proto__
    while(pro) {
      if (pro === right.prototype) {
        return true
      }
      pro = pro.__proto__
    }
    return false
  }
  // 一般不能用来判断基本类型，例如1 instanceof Number ==> false，但是可以通过hack的方式判断基本类型
  class checkNumber {
    static [Symbol.hasInstance](number) {
      return typeof number === 'number'
    }
  }
  1 instanceof checkNumber ==> true
  ```
- Object.prototype.toString.call() 通过对象内置的toString方法

> - 原始类型储存在栈中，引用类型储存在堆中，但是引用类型的对象地址也储存在栈中。
> - bigint可以解决大数相加算法题。

isXXX API
```js
Array.isArray([]) // 判断是否是数组
isNaN(',') // 判断是否是非数字
```

## for 循环和 forEach循环的区别在于？
for是原生的 forEach是Array中的一个方法
```js
function flat(arr){
  const result = []
  arr.forEach(i => {
    if(Array.isArray(i)){
      result.push(...flat(i))
    }else{
      result.push(i)
    }
  })
  return result
}
```

## 类型转换
类型转换分为两种情况，分别为强制转换以及隐式转换
```
[] == ![] => [] == false => [] == 0 => '' == 0 => 0 == 0
```
转布尔值的规则
- undefined, null, false, NaN, '', 0, -0 都转为false
- 其他所有值都转为true，包括所有对象，负数

## this指向
- 普通函数
  1. 函数被谁调用，那么this就是谁，如果没有对象调用，那么this就是window，严格模式下是undefined
  2. 利用 call，apply，bind 改变 this，这个优先级仅次于 new
      ```javascript
      // 多bind链式绑定this只会根据第一个bind的内容进行绑定
      let a = {}
      let fn = function(){
        console.log(this)
      }
      fn.bind().bind(a)()
      //等价于
      let fn2 = function fn1(){
        return function(){
          return fn.apply()
        }.apply(a)
      }
      fn2()
      ```
  3. new出来的就是绑定到新的对象上
    `let son = new Parent()`此时this就是绑定到son上的无法更改，优先级最高
- 箭头函数本身没有this，只取决于离他最近的普通函数的this，无法通过bind更改

## 闭包
定义：假如一个函数能访问外部的变量，那么这个函数它就是一个闭包，而不是一定要返回一个函数
- 由于闭包中引用的外部变量，所以JavaScript引擎判断这是一个闭包，因此会在堆空间创建一个"closure(闭包名)"的对象(在`[[Scopes]]`中)，用来保存引用的外部变量值，这是一个内部对象，JavaScript是无法访问的
- 闭包也存在垃圾回收机制，只是因为引用一直存在所以不会被回收垃圾（"closure(闭包名)"对象对外部变量的引用）

## new操作符
`new`操作符可以帮助我们构建出一个实例，并且绑定上`this`，内部执行步骤可大概分为以下几步：
1. 新生成一个对象
2. 对象连接到构造函数的原型上，并绑定this
3. 执行构造函数的代码
4. 返回新对象
但是第四步存在特殊情况，如果构造函数返回一个对象，那么内部构建出来的对象会被返回的对象所覆盖，所以一般构造函数不要返回对象，如果返回原始类型则不会有影响
```js
function myNew(F, ...args) {
  let obj = {}
  obj.__proto__ = F.prototype
  let result = F.call(obj, ...args)
  return result instanceof Object ? result : obj
}
// 如果构造函数返回对象
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'ming' }
  return { age: 26 }
}
const t = new Test('ming')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```

## 作用域
作用域可以理解为变量的可访问性，总共分为三种类型，分别为
- 全局作用域
- 函数作用域
- 块级作用域，ES6中的let、const就可以产生该作用域

词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。
词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。
作用域链是由词法作用域构成的。根据作用域链查找内容，会先查找自己内部的词法环境，再查找变量环境，找不到会去outer指向的执行上下文的词法环境查找，依次类推。`[[Scopes]]`就是作用域链。

## 原型
![](./images/proto.png)
- 所有对象都有一个属性`__proto__`指向一个对象，也就是原型
- 每个对象的原型都可以通过`constructor`找到构造函数，构造函数也可以通过`prototype`找到原型
- 所有函数都可以通过`__proto__`找到`Function`对象
- 所有对象都可以通过`__proto__`找到`Object`对象
- 对象直接通过`__proto__`连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层的`Object`对象，在往上就是`null`了

## 继承
即使是ES6中的`class`也不是其他语言中的类，本质上就是一个函数。
```js
class Person {}
Person instanceof Function // true
```
ES5和ES6继承的区别：
1. ES6继承的子类需要调用`super()`才能拿到子类，ES5通过apply绑定的方式
2. 类声明不会提升，与`let、const`一致
```js
// ES5继承
function Super() {}
Super.prototype.getName = function() {
  return 1
}

function Sub() {}
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
```

## 深浅拷贝
### 浅拷贝
两个对象第一层的引用不相同就是浅拷贝的含义
可以通过`assign`、扩展运算符、`concat`等方式来实现
```js
let a = {
  age: 18
}
let b = Object.assign({}, a)
let c = { ...a }
a.age = 20
console.log(b.age) // 18
console.log(c.age) // 18
```
### 深拷贝
两个对象内部所有的引用都不相同就是深拷贝的含义。
- 最简单的方法`JSON.parse(JSON.stringify(object))`
  该方法存在许多问题，首先是只支持JSON支持的类型，JSON是门通用的语言，并不支持JS中所有类型仅对`object, array, string, number, 'true', 'false', 'null'`支持，同时还会存在不能处理循环引用的问题，例如对Vue实例使用该方法就会报错
- 如果想解决`JSON.parse(JSON.stringify(object))`所产生的问题，可以通过递归的方式来实现代码
  ```js
  // 通过WeakMap解决循环引用问题
  let map = new WeakMap()
  function deepClone(obj) {
    if (obj instanceof Object) {
      if (map.has(obj)) {
        return map.get(obj)
      }
      let newObj
      if (obj instanceof Array) {
        newObj = []
      } else if (obj instanceof Function) {
        newObj = function () {
          return obj.apply(this, arguments)
        }
      } else if (obj instanceof RegExp) {
        newObj = new RegExp(obj.source, obj.flags)
      } else if (obj instanceof Date) {
        newObj = new Date(obj)
      } else {
        newObj = {}
      }
      // Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符
      let desc = Object.getOwnPropertyDescriptors(obj)
      let clone = Object.create(Object.getPrototypeOf(obj), desc)
      map.set(obj, clone)
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = deepClone(obj[key])
        }
      }
      return newObj
    }
    return obj
  }
  ```
  当然通过递归进行深克隆会存在爆栈的问题，因为执行栈的大小是有限制的，到一定数量栈就会爆掉。解决爆栈的问题，可以通过遍历的方式来改写递归。通过层序遍历（BFS）来解决，也可以通过加入定时器的方法来把当前任务拆分为其他很多小任务。
  > 为什么使用定时器可以解决栈移除问题？ function foo() { setTimeout(foo, 0) } foo() 像setTimeout、setInterval、Promise 这样的全局函数不是JavaScript的一部分，而是Web API部分。 当遇到Web API时，会将其回调函数(foo)交给WebAPIs处理，此时调用栈中foo函数执行完毕，出栈，栈为空；回调函数会被发送到任务队列中，等待event loop事件循环将其捞出，重新放入到堆栈中。参考：https://juejin.im/post/5d2d146bf265da1b9163c5c9#heading-15


## Promise
- Promise中只有涉及到状态变更后才需要被执行的回调才算是微任务，比如说`then`、`catch`、`finally`，其它所有的代码执行都是同步执行。
- `Promise.then`虽然是同步任务，但是将回调放入队列的时机取决于前面Promise状态，如果Promise状态为pending，那么成功或失败的回调会分别被加入至`[[PromiseFulfillReactions]]` 和 `[[PromiseRejectReactions]]` 中，如果Promise状态为非pending状态，回调就会成为Promise Jobs，也就是微任务，放入微任务队列中。因此得出结论：**链式调用中，只有前一个`then`的回调执行完毕后，跟着的`then`中的回调才会被加入至微任务队列。**
- **同一个Promise的每个链式调用的开端会首先一次进入微任务队列。**

高阶例子：
```js
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return Promise.resolve();
      })
      .then(() => {
        console.log("then1-2");
      });
  })
  .then(() => {
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  });
/*
实际顺序：
then1
then1-1
then2
then3
then4
then1-2
*/
```
上面`then1-2`之所以最后出现的原因，是因为：
1. 根据Promise A+ 规范，如果`resolve`了一个`Promise`，需要为其加上一个`then`并`resolve`，因此想当于多入队一次微任务。
   ```js
   if (x instanceof MyPromise) {
      if (x.currentState === PENDING) {
      } else {
        x.then(resolve, reject);
      }
      return;
    }
   ```
2. 根据ECMA - 262规范，当`Promise resolve`了一个Promise时，会产生一个`NewPromiseResolveThenableJob`，这是属于Promise Jobs中的一种，也是微任务，并且该Jobs还会调用一次`then`函数来`resolve Promise`，因此又生成了一次微任务。

根据以上两点得出结论，Promise中如果resolve了一个Promise，会落后两个微任务队列，因此上面例子中`then1-2`才最后出现。

关于Promise相关的两个题目
- [消息队列](https://github.com/KieSun/fucking-frontend/issues/5)
- [Promise all 错误处理](https://github.com/KieSun/fucking-frontend/issues/6)

## async、await
ES7引入了async/await，提供了再不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。async/await使用了同步代码的方式实现了异步处理逻辑，支持使用try catch来捕获异常。async/await使用了生成器（Generator）和Promise两种技术。
### 生成器VS协程
生成器函数是一个带星号函数，而且是可以暂停执行和恢复执行的。
生成器函数之所以能暂停和恢复，是通过协程来实现的。协程是一种比线程更加轻量级的存在。协程可以看作是跑在线程上的任务，一个线程上可以存在多个协程，但是线程上同时只能执行一个协程，当要在A协程执行时启动B协程，A协程就会将主线程的控制权交给B协程，这样A协程暂停执行，B协程恢复执行，此时A协程被称为B协程的父协程。因为协程不是被操作系统内核所管理，而是由程序所控制，因此不会像线程切换那样消耗资源。
```js
// 生成器例子
function *foo(x) {
  let y = 2 * (yield (x + 1)) // 通过yield关键字暂停it协程的执行，并返回主要信息给父协程
  let z = yield (y / 3)
  return (x + y + z) // 在协程执行期间，如果遇到return，那么JavaScript引擎会结束当前协程，并将return后面的内容返回给父协程
}
let it = foo(5) // 创建一个协程it
console.log(it.next())   // => {value: 6, done: false} 调用it.next才会让it协程开始执行
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
// 当在it协程中调用了yield方法时，JavaScript引擎会保存it协程当前的执行栈信息，并恢复父协程的调用栈信息。同样，在父协程执行it.next是，JavaScript引擎会保存父协程的调用栈信息，并恢复it协程的调用栈信息。

// 执行生成器的代码 co
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(data => next(data), reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}
```
## 事件循环
浏览器页面是由消息队列和事件循环系统来驱动的。
![](./images/eventloop.png)
![](./images/eventloop2.png)
JavaScript是一门单线程语言，在执行过程中永远只能同时执行一个任务，任何异步的调用都只是在模拟这个过程，或者说可以直接认为JavaScript中的异步就是延迟执行的同步代码。
异步任务可以看作是异步回调，通常异步回调主要有两种方式：
1. 把异步回调函数封装成一个**宏任务**，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数。消息队列中每个任务都可以看作是一个宏任务，因此宏任务不一定是放入任务队列就会很快执行。宏任务的种类：同步代码、setTimeout回调、setInteval回调、IO、UI交互事件、postMessage、MessageChannel
2. 第二种方式的执行时机是在主函数执行结束之后，当前宏任务结束之前执行回调函数，这通常都是以**微任务**形式体现的。当JavaScript执行一段脚本的时候，V8会为其创建一个全局执行上下文，同时也会在内部创建一个微任务队列用于存放微任务。在当前宏任务中的JavaScript快执行完成时，也就是JavaScript引擎准备退出全局执行上下文并清空调用栈的时候，引擎会检查其中的微任务队列，然后按照顺序执行队列中的微任务，这个时间点被称为**检查点**。在执行微任务的过程中，如果产生了新的微任务，同样会将该微任务添加到当前队列中，引擎会一直循环微任务队列中的任务，知道队列为空才算执行结束。因此如果一直产生新的微任务那么永远也不会执行到下个宏任务。如果需要任务更快的执行就得用微任务保证。微任务的种类：Promise状态改变以后的回调函数（then函数执行，如果此时状态没变，回调只会被缓存，只有当状态改变，缓存的回调函数才会被丢到任务队列）、MutationObserver回调函数、queueMicrotask回调函数（新增的API）。

Event Loop执行顺序：
1. 执行主函数代码
2. 执行完主函数代码后在当前宏任务结束之前，判断微任务队列中是否有微任务需要执行
3. 循环执行所有微任务直至微任务队列为空（每一个Event Loop都有一个microtask队列）
4. 是否有必要渲染页面
5. 执行下一个宏任务
    > 如果要在页面渲染以后最快知道，需要用宏任务而不是微任务，因为页面渲染实在微任务队列清空之后才会执行的，渲染完之后就会去执行下一个宏任务。

**[Event Loop详细解释](https://github.com/aooy/blog/issues/5)**

## var let const
var会在解析的时候导致变量提升
var a = 1语法解析的时候会在最上面先声明var a
之后进行赋值操作a=1
let const不会发生变量提升 但是会存在一个暂时性死区

## 模块化
- 解决命名冲突
- 提高代码可重用性
- 提高代码的可维护性

主流的模块化分为CommonJS以及ESM

CommonJS是Node独有的规范，Webpack也自己实现了这套东西，让我们能在浏览器里跑起来这个规范。
```js
// a.js
module.exports = {
  a: 1
}
// or
exports.a = 1

// b.js
const module = require('./a.js')

// 大致内部实现
var module = {
  exports: {}
}
var exports = module.exports
var load = function (module) {
  // 导出的内容
  var a = 1
  module.exports = a
  return module.exports
}
```
由此也可以看出为什么不能直接对exports直接赋值。

CommonJS和ESM之间的区别
- 前者支持动态导入，也就是`require(${path}/xx.js)`，后者可以用`import()`
- 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- 前者导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必然需要重新导入一次。后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化。

> 小拓展
> Webpack中有Tree-Shaking机制，但对CommonJS效果不佳，对ESM效果很好，因为ESM会进行静态分析，知道哪些代码是不要的，但是CMD不行
> 在Webpack4里面对ESM效果也不佳，因为4中只是单纯判断到底有没有import进来使用，没用就干掉没被引入的文件，但是这一步lint工作就可以在开发阶段实现了。Webpack5中实现了import了一个文件中的函数，把其他没用到的代码全部不干掉。
> ![](./images/treeshaking.png)

## 垃圾回收机制
新生代算法和老生代算法
- 新生代算法
对象一般存活时间较短 From To两个空间一个是使用的一个是空闲的，新的变量放到From中 当From中的对象满了就会开启新生代垃圾回收，将失活的清除，将存活的放到To中，之后将两个空间互换
- 老生代算法
对象存活时间较长切数量较多 使用标记清除算法和标记压缩算法

## 线程 进程 协程
进程由多个线程组成，一个线程描述了执行一段指令所需的时间
进程描述了CPU在运行指令及加载和保存上下文所需的时间

类比 一个浏览器的tab页就是一个进程，里面包含了js引擎线程，渲染线程，http请求线程等

单线程的好处：节省内存，节省上下文切换时间，没有锁的问题
协程是比线程还小的单位，在async/await中就用到了协程，当运行到async在的await后，函数协程切换到主协程。协程还有另一个名称就是Fiber，React中的Fiber算法就是依赖协程机制。

## 执行栈
存储函数调用的栈结构 先进后出
爆栈 -> 执行栈存放是有限制的，存放过多就会导致爆栈一般出现在递归中

## Event Loop
宏任务 script、setTimeout、setImmediate、setInterval、I/O、UI rendering
微任务 promise、process.nextTick、MutationObserve

- 浏览器中
当遇到异步函数时，会将函数挂起然后放到不同的task队列中
浏览器中的Event Loop先执行同步函数，当执行栈为空时，就会从task中拿出异步代码执行，
首先会将挂起的微任务队列中的微任务执行完，然后继续从宏任务队列中拿一个宏任务 执行完后再从微任务队列中执行微任务，依次执行

- Node中
  - timers 执行setTimeout setInterval回调
  - I/O 执行上一轮少数未执行的I/O回调
  - idle prepare
  - poll
    - 回到timer执行回调 执行I/O回调
    - 如果没有timer的话 如果poll不为空 会遍历执行回调队列同步执行直至队列为空或者达到系统限制；如果poll为空 如果有setImmediate会跳到check执行，如果没有的话会一直等待新的回调 然后执行（有超时设置）
  - check 执行setImmediate
  - close callbacks  执行close事件的callback


## 事件触发三个阶段
先从window往事件触发处捕获，遇到注册的捕获事件会触发
传播到事件触发处触发注册事件
从事件触发处往window传播，遇到注册的冒泡事件会触发

## 跨域
浏览器出于安全考虑，有同源策略。端口号、域名、协议有一个不同就是跨域
ajax请求就会失败
目的：防止CSRF攻击 实际还是会发送请求，只是会被拦截，所以还是存在CSRF风险
### 解决跨域办法：
- JSONP 通过script标签的src传参并提供一个回调函数进行后续操作
- CORS 设置 `Access-Control-Allow-Origin`
- document.domain `document.domain = 'xxx.com'` 但是只能用于二级域名都相同的情况
- postMessage
  ```
	targetWindow.postMessage('message','http://test.com')

	var mc = new MessageChannel()
	mc.addEventListener('message', event => {
		var origin = event.origin || event.originalEvent.origin
  	if (origin === 'http://test.com') {
  	  console.log('验证通过')
  	}
	})
	```


## 存储
cookie localStorage sessionStorage indexDB

## 浏览器缓存
优先级
Service Worker
Memory Cache
Disk Cache
Push Cache
网络请求

- Service Worker
它是运行在浏览器背后的独立线程，可以用来实现缓存功能，但是传输协议必须是HTTPS，因为其中涉及到请求拦截
实现缓存分三步，首先注册Service Worker，然后监听到install事件之后就缓存需要的文件，之后用户就会从缓存中去获取

- Memory Cache
内存中的缓存 读取高效 但是持续性很短，会随着进程释放而释放，即关闭tab就会被清除
一般大文件大概率不会放到内存中
当内存中使用率过高时，文件会优先存入硬盘

- Disk Cache
可以根据HTTP Header上的字段判断哪些资源可以缓存，哪些资源可以不请求直接使用，哪些资源过期需要重新请求

- Push Cache
HTTP/2中的内容 只有以上三种都未命中时才会被使用，缓存时间很短，只在Session中存在，会话结束后就被释放

## 缓存策略
- 强缓存 缓存期间不需要请求 state code为200
	- Expires HTTP/1的产物 后面加时间表示会在该时间后失效，但是受限于本地时间，如果修改本地时间可能会导致缓存失效
	- Cache-Control HTTP/1.1优先级高于Expires，可以在请求头或者响应头中设置，且有多种指令
	no-store no-cache public private max-age等
- 协商缓存
  如果缓存过期了需要验证资源是否更新，如果资源没有发生改变，state code为304，然后更新浏览器缓存有效期
	- Last-Modified If-Modified-Since
    If-Modified-Since将Last-Modified发送给服务端，有弊端，Last-Modified表示文件最后修改日期，如果只是打开不更改，也会造成其被修改，且只能以秒计时，如果在无法感知的时间内完成，也会造成命中而不会更新
	- ETag If-None-Match 优先级高 If-None-Match将当前ETag发送给服务器，根据ETag是否变化来决定是否需要重新请求

## 浏览器渲染原理
JS引擎 渲染引擎
浏览器接收字节数据转化为字符串，字符串会被标记化打上token，token会转化为node节点，然后再根据node节点转化为DOM树
CSS渲染类似
字节数据=》字符串=》token=》node=》CSSOM
所以html要避免无意义的标签css要避免过于具体多层的css选择器，最好可以层级扁平

DOM树和CSSOM树会组合为渲染树 render tree
然后浏览器会根据渲染树进行布局（回流） 然后调用GPU绘制

JS操作DOM慢是因为JS是在JS线程上 而DOM是在渲染线程上，JS操作的话会进行线程间的通信，损耗性能，且操作DOM还可能发生重绘回流

## 阻塞渲染
HTML和CSS会阻塞渲染，因为就是二者生成渲染树
JS加载也会阻塞渲染
script上加defer属性，会让js并行下载，会在HTML解析完执行后再执行
script上加async属性，会让js并行下载，下载完完后就会执行

## 重绘和回流
重绘是当节点需要改变的外观不影响布局
回流是布局或者几何属性需要改变
回流一定发生了重绘，重绘不一定发生回流

重绘与回流和Event Loop有关
减少重绘回流
- transform 代替 top
- visibility 代替 display: none
- 不把节点的属性值放在一个循环里当变量
- 不使用table布局
- 动画实现速度越快 回流次数越多
- css选择符从右往左匹配，减少层级
- will-change等
- 避免频繁操作样式，可汇总后统一一次修改
- 尽量使用class进行样式修改
- 减少dom操作，可使用字符串或者documentFragment一次性插入

## 性能优化
- 通过减少代码文件的大小或减少书写嵌套函数减少编译时间
- 尽量保证传入参数类型一致，方便V8优化代码
- 图片方面优化，懒加载，雪碧图，小图片用base64，图标用svg，照片JPEG等
- DNS预解析 dns-prefetch
- 节流 throttle
- 防抖 debounce
- 预加载 preload 不会阻塞onload事件
- 预渲染 prerender
- 懒执行
- CDN加速

## 计算机网络
- 应用层 HTTP FTP
- 传输层 TCP UDP
- 网络层
- 数据链路层
- 物理层

## UDP TCP
- UDP
  - 面向无连接
  - 不可靠性
  - 高效  
UDP协议是面向无连接的，不需要在正式传输前建立连接，UDP只是数据报文的搬运工，不保证数据有序不丢失，UDP也没有任何控制流量的算法，所以相较TCP来说比较轻便

发送过程也很简单 无需进行任何拆分可拼接

发送端应用层传递给传输层UDP协议 UDP加一个UDP头标识自己是UDP协议就继续传递给网络层
接收端网络层传递给传输层，UDP只需要去掉UDP标识头就直接传递给应用层，不进行其他任何操作
UDP不会备份任何数据，而且也不在乎对方是否收到数据
UDP没有拥塞控制，会以一个恒定速度发送数据，当网络不好的时候就会造成丢包，但是对实时性要求高的场景却是优点
UDP支持一对一、一对多、多对多、多对一的方式，支持单播，广播，多播的功能

- TCP
TCP需要先通过三次握手来建立连接，在传输过程中也通过各种算法保证数据的可靠性，所以导致并没有UDP那么高效
标识符
ACK=1 该字段为一时表示字段有效，TCP规定连接建立后传送的所有报文段都必须把ACK置一
SYN=1 当SYN=1 ACK=0时 表示当前报文段是一个连接请求报文。当SYN=1 ACK=1的时候，表示当前报文段是一个同意建立连接的应答报文

三次握手
第一次握手：客户端发送一个连接请求报文ACK=0 SYN=1 seq = x
第二次握手：服务端收到连接请求报文，返回一个同意进行连接的报文ACK=1 SYN=1 ack=x+1 seq = y
第三次握手：客户端收到同意进行连接报文，发送确认报文ACK=1 SYN=1 seq=x+1 ack=y+1
第三次握手的原因防止出现实现的连接请求报文被服务端接收

四次挥手
第一次挥手：客户端发送一个连接释放报文FIN=1 seq=u 进入FIN-WAIT-1阶段
第二次挥手：服务端收到客户端的释放报文返回一个确认报文ACK=1 seq=v ack=u+1 进入CLOSE-WAIT阶段 这时客户端到服务端的连接关闭了，但是客户端还可以接受服务端传递的数据
第三次挥手：服务端向客户端发送连接释放报文FIN=1 seq=w ack=u+1（和二次发送的确认报文序号一样）进入LAST-ACK阶段
第四次挥手：客户端收到服务端的释放报文返回确认报文ACK=1 seq=u+1 ack=w+1进入TIME-WAIT阶段要等待2MSL才会彻底关掉。目的是为了确认服务端收到了确认报文，如果丢失还可以重新发送，还为了防止已实现的连接报文出现在本连接中

## ARQ协议
超时重传机制 通过确认和超时机制保证数据正确送达
- 停止等待ARQ
  每次发送报文都会停止继续发送，并设置一个定时器，直到收到确认报文才会取消定时器，继续发送下一段报文。如果超过定时器时间就会重新发送丢失的数据，因此每次发送都会备份发送的数据，如果对端收到错误报文也会抛弃报文等待重传；如果对端的ACK超时会丢失，此时A端也会重传报文，对端收到后会丢弃该报文然后重传应答
- 连续ARQ
  通过发送窗口，把窗口内的分组发送给服务端，服务端返回确认后会继续往后发送，接收方一般是才用累计确认，在收到几个分组后将按序到达的最后一个分组发送确认，弊端是如果中间有分组丢失，接收方只能返回前面得分组，导致发送方进行回退，重新发送一些已发送的数据。

## 拥塞处理
- 慢开始 指数级增长直到设置的慢开始门限
- 拥塞避免 线性增长使网络不容易出现拥塞
- 快速重传 如果个别报文段丢失，接收方会立即发送3次重复确认，发送方会确认丢失该报文，重新传送
  - TCP Taho 将慢开始门限设为拥塞窗口一半，将拥塞窗口设为1MSS，重新开始慢开始算法
  - TCP Reno 拥塞窗口减半，将门限设为拥塞窗口一半，进入快恢复阶段，开始拥塞避免算法
- 快恢复 如果只是个别报文段丢失而不是超时，会将门限值变为当前拥塞窗口的1/2，并且拥塞窗口也来到1/2开始拥塞避免算法

## HTTP请求
HTTP分为请求报文和响应报文，都由三部分组成
1. 开始行（请求行/状态行）
2. 首部行 用来说明浏览器服务器或报文主体的一些信息，结束后还有一行空格与实体隔开
3. 实体主体

get请求多用于无副作用，幂等的场景，例如搜索关键字；post多用于有副作用，不幂等的情况，例如注册
get请求能缓存，post不能
get请求放到url中会被浏览器保存记录，post不会，url长度有限制，post支持更多编码类型且不对数据类型限制

## 常见状态码
- 1xx表示通知信息
- 2xx表示成功
- 3xx表示重定向
- 4xx表示客户差错
- 5xx表示服务器差错

## TLS
HTTPS通过HTTP来传输信息，但是信息通过TLS协议进行加密
TLS位于传输层之上应用层之下
- 对称加密 两边都拥有相同的秘钥进行加密解密，但是如果直接通过网络方式传播秘钥，被拦截后加密就失去意义
- 非对称加密 有公钥私钥之分，公钥所有人都知道，但是数据解密需要私钥，私钥只有分发公钥的人知道。公钥加密，私钥解密

TLS握手
第一次 ClientHello 客户端发放一个随机值以及需要的协议和加密方法
第二次 ServerHello 服务端收到随机值，自己也产生一个随机值，并根据客户端需要的协议和加密方法使用对应方式，发送自己的证书
第三次 客户端收到后验证是否有效，有效的话会生成第三个随机值通过公钥加密，然后把自己的证书还有随机值发送给服务端，服务端收到之后通过私钥解密随机值，至此，两端将三个随机值组合成秘钥开始进行对称加密

## HTTP/2 HTTP/3
HTTP/1 无法复用链接，完成即断开，重新慢启动和TCP3次握手
HTTP/1.1 长连接（keep-alive）复用，host字段指定对应的虚拟站点
- 断点续存
- 身份认证
- 状态管理
- cache缓存
  - Cache-Control
  - Expires
  - Last-Modified
  - ETag 

HTTP/2使用多路复用
HTTP/1 中同一个域名下请求数量是有限制的，当请求很多资源时，队头阻塞会导致到达最大请求数量时，剩余资源需要等待其他资源请求完才可以再请求
HTTP/2 使用了多路复用，通过一个TCP连接可以传输所有的请求数据
HTTP/2中有帧（frame）和流（stream）帧代表最小的数据单位，每个帧都会标识出该帧属于哪个流，流由多个帧组成。多路复用就是在一个TCP连接中可以存在多个流，对端通过帧中的标识确定属于哪个请求，这样就可以避免之前HTTP版本中的队头堵塞，提高传输性能。

HTTP/2使用二进制传输
在之前的HTTP版本中都是通过文本的方式传输数据，在HTTP/2中引入新的编码机制，所有传输的数据被分割，采用二进制格式编码

HTTP/2使用Header压缩
在HTTP/1中 使用文本的形式传输Header，如果header中存在cookie的情况下，可能每次都需要重复传输很多字节
在HTTP/2中 使用了HPACK压缩格式对header进行编码，减少了header大小。而且在两端维护了索引表，会记录已出现的header，这样出现过的header、就可以通过传键名，在对端根据键名进行获取

HTTP/2使用服务端Push
在HTTP/2中，服务端可以根据客户端某个请求后，主动推送其他资源，减少一点延迟时间，当然浏览器兼容的情况下也可以使用prefetch

HTTP/3
HTTP/2由于TCP协议的关系，在实现多路复用的情况下，如果出现丢包，性能的消耗反而会比HTTP/1还大，因为多路复用只有一个TCP连接。所以HTTP/3使用了新的协议QUIC

QUIC基于UDP，又取了TCP中的精华，实现既快又可靠的协议
- 多路复用：不同于HTTP/2在一个TCP连接中的多路复用，QUIC本身就支持多路复用，并且传输的单个数据流可以保证有序交付且不会影响其他数据流，解决了TCP中的问题。而且TCP是基于IP和端口去识别连接的，但是QUIC是基于ID的方式去识别，只要ID不变，就能迅速重连
- 0-RTT 通过使用类似TCP快速打开技术，缓存当前会话上下文，在下次恢复会话时，将上下文传递给服务端验证通过就可以进行传输了
- 纠错机制 假如要发三个包，那么协议会根据三个包异或值单独发一个校验包，如果三个包有一个丢失，可以根据校验包计算出丢失包的内容，但是如果多个包丢失就无法使用纠错机制了，只能使用重传

## 输入URL到页面渲染的整个流程
DNS解析 DNS基于UDP协议对域名进行解析，获取到IP，之后跳转到IP
之后客户端会和服务端建立连接 TCP三次握手
建立TCP连接后会进行TLS握手
完成后进行HTTP请求 服务端响应请求返回HTML文件
HTML渲染，HTML获取的时候是二进制码，先转化为字符串，之后标记化，然后组成node，最后变成DOM树 ，CSS同理，如果有不属于async或defer的js会先阻塞DOM和CSSOM过程，先执行js，加载外部资源等操作，js执行完后会继续生成DOM树和CSSOM树，最终两个树会生成渲染树，此时浏览器就开始调用GUI进行绘制

## doctype作用
DOCTYPE声明位于文档最前面，处于标签之前，作用是告诉浏览器的解析器，要用什么文档类型规范来解析，同时也用来区分严格模式与混杂模式

## 标签语义化的作用
1. HTML机构清晰
2. 代码可读性好
3. 无障碍阅读
4. 搜索引擎可以根据标签的语言确定上下文和权重
5. 移动设备更完美展现页面
6. 便于团队开发和维护

## CSS选择器优先级
内联 > id选择器 > 类选择器，属性选择器，伪类选择器 > 标签选择器，伪元素选择器

## 浏览器同源策略
同源策略是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源进行交互。它可以帮助阻隔恶意文档，减少被攻击的媒介。
跨域
JSONP
document.domain
CORS -》 Access-Control-Allow-Orign

## flex
flex-direction 主轴方向 row column
flex-wrap 是否换行
flex-flow flex-direction和flex-wrap的组合属性
justify-content 主轴方向上的对齐方式 center space-between等
align-items 交叉轴的对齐方式 center baseline等 默认stretch是沾满容器高度
align-content 多根轴线的定义方式（设置了wrap且分行后才会生效）
order项目的顺序 数值越小越靠前 默认为0
flex-grow 项目放大的比例 默认为0 即空间即使变大项目也不变
flex-shrink 项目缩小比例 默认为1 即空间缩小的话项目将缩小
flex-basis 定义项目在分配多余空间之前占据主轴的空间，默认是auto即项目本来的大小
flex 是flex-grow flex-shrink flex-basis缩写
flex: auto => flex: 1 1 auto
flex: none => flex: 0 0 auto

## git
git merge --abort 放弃merge 使Git仓库回到merge前的状态
git rebase
git commit --amend修正上一次commit 将修改后的内容和当前commit里的内容合并起来成为一个新的commit然后替换掉
修改倒数第二个
git rebase -i 目标comit 
然后在编辑页面指定需要修改的commit改为edit
之后使用git commit --amend
最后git rebase continue
~x表示后移x位commit
^数量表示前移多少位

撤销提交git reset --hard 目标commit 
另一种撤销提交git revert 这个是提交了一次反转上个commit的commit

git stash
git stash pop


# CSS
## 盒模型
- content-box(W3C标准盒模型)
- border-box(IE盒模型)
- padding-box
- margin-box(浏览器未实现)

## BFC（块级格式化上下文）
IE可通过zoom: 1触发
触发条件：
1. 根元素
2. float不为none
3. overflow不为visible
4. display: inline-block, table
5. position: absolute/fixed

## 层叠上下文
触发条件：
1. 根层叠上下文HTML
2. position
3. css3属性
   - flex
   - transform
   - opacity
   - filter
   - will-change
同一层叠上下文在z轴上排序</br>
z-index为正值 > z-index: 0/auto > 行内元素 > 浮动元素 > 块级元素 > z-index为负值 > background/boarder

## CSS动画
- transition: 过渡动画
  - transition-property: 属性
  - transition-duration: 间隔
  - transition-timing-function: 区线
  - transition-delay: 延迟
  - 常用钩子：transitionend
- animation / keyframes
  - animation-name: 动画名称，对应 @keyframes
  - animation-duration: 间隔
  - animation-timing-function: 区线
  - animation-delay: 延迟
  - animation-iteration-count: 次数
    - infinite: 循环动画
  - animation-direction: 方向  
    - alternate: 反向播放
  - animation-fill-mode: 静止模式
    - forwards: 停止时，保留最后一帧
    - backwards: 停止时，回到第一帧
    - both: 同时运用上两者
  - 常用钩子: animationend
- 动画属性
  - translate 平移
  - scale 缩放
  - rotate 旋转
  - skew 二维平面上的倾斜转换
  - opacity
  - color

# JavaScript
## 执行上下文EC
包含三个部分
- 变量对象VO：可以抽象为一种**数据作用域**，它存储着该执行上下文中所有的**变量和函数声明（不包含函数表达式）**，当它处于 active EC 中时，被称为活动对象AO
- 作用域链（词法作用域）：可以理解为一组对象列表，包含父级和自身变量对象，因此才可以访问的父级里声明的变量或函数。由两部分组成
  - `[[scope]]`：指向父级的变量对象和作用域链，即包含父级的`[[scope]]`和AO
  - AO：自身活动对象
- this指向

类型
- 全局执行上下文
- 函数执行上下文
- eval执行上下文

代码执行过程
- 创建全局上下文global EC
- 全局执行上逐行自上而下执行。遇到函数时，函数执行上下文被push到执行栈顶层
- 函数执行上下文被激活，成为active EC，开始执行函数中代码，全局执行上下文被挂起
- 函数执行完之后，被pop移出执行栈，全局执行上下文继续执行

## 闭包
闭包属于特殊的作用域，静态作用域。在父级被销毁后，返回的子函数`[[scope]]`中仍然保留着父级的变量对象和作用域链，因此可以继续访问到父级的变量对象。

## babel编译原理
- 首先babylon将高级的代码解析为AST
- babel-traverse对AST进行遍历转译，得到新的AST
- babel-generator将新的AST转化为ES5代码

## 跨标签页通讯
不同标签页间的通讯，原理是运用一些可共享的中间介质
- 通过父页面window.open 和 子页面的postMessage
  - 目标targetWindow.postMessage(message, Origin)
  - 接收信息的窗口addEventListener('message', cb)
- 设置同域下共享的localStorage和onstorage
  - 重复写入相同值无法触发
  - 会受到浏览器隐身模式等的限制
  - onstorage只有其他同源窗口会触发，当前窗口不会触发
- 设置共享cookie与不断轮询脏检查
- 借助服务端或者中间层实现

## 浏览器架构
- 用户界面
- 主进程
- 内核
  - 渲染引擎
  - JS引擎
    - 执行栈
  - 事件触发线程
    - 消息队列
      - 宏任务
      - 微任务  
  - 网络异步线程
  - 定时器线程

## Web Worker
现代浏览器为JavaScript创造的多线程环境。可以新建并将部分任务分配到worker线程并行运行，两个线程可独立运行，互不干扰，可以通过自带的信息机制相互通信。
```
const worker = new Worker('work.js') //参数必须是网络获取的脚本文件，不能是本地资源
worker.postMessage('message from 主线程') //主线程向worker传递信息
worker.terminate() //主线程关闭worker
//worker中
self.postMessage('message from worker') //worker向主线程传递信息，self是worker中的全局对象
self.close() //worker线程关闭自己
```
限制:
- 同源限制
- 无法使用document/window/alert/confirm
- 无法加载本地资源

## WebSocket
WebSocket是一个持久化的协议，基于HTTP，目的是使服务端可以主动push
```
//客户端
const ws = new WebSocket('ws://localhost:8080') //使用的协议标识符是ws是在TCP协议之上的，如果加密则是wss（中间多一层TLS）
ws.addEventListener('open', function(event){
	ws.send('Hello Server')
})
ws.addEventListener('message', function(event){
	console.log(event.data)
})
//node服务端
const WebSocketServer = require('ws').Server
const wsServer = new WebSocketServer({port: 8080})
wsServer.on('connection', (socket)=>{
	socket.on('message', message=>{
		console.log('接收到客户端消息:'+message)
		socket.send('服务器回应:'+ someData)
	})
})
```
使用websocket协议没有跨域问题，但是可以通过设置Origin进行限制，同时请求头会有新的header
```
Upgrade: websocket //表示升级为websocket协议
Connection: Upgrade //表示使用升级协议
Sec-WebSocket-Version //表示websocket协议版本
Sec-WebSocket-Key //浏览器随机生成与服务端的Accept相互匹配
```
响应头也有新的header
```
Connection: Upgrade
Sec-WebSocket-Accept: 
Upgrade: websocket
```
且状态码为101 表示切换协议
Sec-WebSocket-Key和Sec-WebSocket-Accept作用
- 避免服务端收到非法的websocket连接
- 确保服务端理解websocket连接
- 用浏览器里发起ajax请求，设置header时，Sec-WebSocket-Key以及其他相关的header是被禁止的

Sec-WebSocket-Accept的获得
```
const crypto = require('crypto')
const number = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
const webSocketKey = 'IHfMdf8a0aQXbwQO1pkGdA=='
let webSocketAccept = crypto.createHash('sha1').update(webSocketKey+number).digest('base64')
console.log(websocketAccept);//aWAY+V/uyz5ILZEoWuWdxjnlb7E=
```

# 算法
五大算法
- 贪心算法
- 分治算法
- 动态规划
- 回溯法
- 分支限界法