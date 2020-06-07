
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