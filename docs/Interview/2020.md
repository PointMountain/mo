## 微信小程序登陆流程
首先通过`wx.login`获取`code`，之后将`code`通过`wx.request`发送到第三方服务器，第三方服务器将`appid、appsecret、code`发送给微信官方api请求到`session_key, openid`，之后服务器可以通过`token`之类自定义登录态的将其与`session_key, openid`关联，且将`session_key, openid`保存到服务端，然后把自定义登录态返回给小程序，小程序将其保存起来，之后进行业务请求的时候携带用于查询`session_key, openid`是否符合条件。

## 微信小程序授权的流程
获取用户信息的api `wx.getUserInfo`，需要在用户已授权的情况下才会进入success回调，否则会进入fail回调，用户授权需要增加一个`<button open-type='getUserInfo' bindgetuserinfo='yourMethod'>授权用户信息</button>`按钮，用户点击确认授权后就会获得信息，与`wx.getUserInfo`回调返回的数据一致

## 微信小程序渲染机制
小程序视图层目前使用WebView作为渲染载体，逻辑层是由JavaScriptCore作为运行环境。两个都是独立的模块，并不具备数据之间共享的通道，它们之间的通信是通过两边的evaluateJavaScript所实现。用户传输的数据，会先被转化为字符串形式传递，同时把传递后的数据内容转化为JS脚本，最后运行JS脚本的形式传递到两边独立环境。

## 微信小程序生命周期
- App内
`onLaunch`,`onShow`,`onHide`,`onError`
- Page内
`onLoad`,`onShow`,`onReady`,`onHide`,`onUnload`

 **如果同时有app和page的生命周期，会先触发app的，然后触发page内的**
 后退之后不会触发onLoad，只会触发onShow

## cookie localStorage
- cookie
`domain`：cookie可以通过设置domain让两个二级域名相同的跨域请求中，cookie可以互相使用，eg: t1.test.com 和 t2.test.com，在第一个页面中生成cookie 如果不设置默认domain是当前域名 t1.test.com，此时 t2.test.com 无法使用此cookie，如果设置 domain=.test.com 此时两个页面都可以使用此cookie </br>
`path`：默认是根目录 / ，即当前域名下页面都可视cookie，如果设置了path，则只有匹配的path才可视
- localStorage
localStorage不支持跨域

## 常见的请求header字段，状态码
- Cache-Control 控制缓存行为
- Connection 浏览器想优先使用的连接类型
- Date 创建报文时间
- Transfer-Encoding 传输编码方式
- Accept 能正确接收的媒体类型（请求头）
- Accept-Encoding 能正确接收的编码格式列表（请求头）
- Accept-Language 能正确接收的语言列表（请求头）
- Host 服务器域名（请求头）
- If-Modified-Since 判断Last-modified是否改变（请求头）
- If-None-Match 判断ETag是否改变（请求头）
- User-Agent 客户端信息（请求头）
- Referer 表示浏览器所访问的前一个页面（请求头）
- Server 服务器名字（响应头）
- ETag 资源标识（响应头）

- 200 表示客户端发来的请求在服务端被正确处理
- 204 No Content 表示响应报文不含实体的主体部分
- 301 永久性重定向
- 302 临时性重定向
- 304 表示服务器允许访问资源，但因发生请求未满足条件的情况
- 400 请求报文存在语法错误
- 401 表示发送的请求需要有通过HTTP认证的认证消息
- 403 表示请求资源被拒绝
- 404 表示服务器上没有请求的资源
- 500 服务端在执行请求时发生错误
- 501 服务器不支持当前请求所需要的某个功能
- 503 表明服务器暂时处于超负荷或正在停机维护，无法处理请求
- 504 表明服务器作为网关或代理，但是没有及时从上游服务器收到请求

## JS版本发送变化
- 通过webpack打包时给JS设置Hash值，当Hash值不同时，表明JS发生变化，需要重新请求新的JS而不是用缓存的JS
- 通过引入JS后加一个`xxx.js?v=20200524`一个版本号，原理与hash类似

## HTTP和HTTPS区别
1. HTTPS需要申请证书
2. HTTP是明文传输，HTTPS使用了TLS进行加密传输
3. HTTP端口是80 HTTPS端口是443 二者使用的连接方式不同
4. HTTP连接是简单，无状态的；HTTPS是由TLS+HTTP构建的可进行加密传输、身份认证的网络协议。

## 闭包
- 什么是闭包
  函数A中有一个函数B，函数B可以调用函数A的变量，函数B就是闭包
- 闭包的用途
  封装私有变量，防抖节流，回调方法
- 闭包是否会造成内存泄漏
  闭包并不会造成内存泄漏，造成内存泄漏的原因是因为IE的垃圾回收机制，在JS高程中是这样描述的：
	> 由于IE9 之前的版本对JavaScript 对象和DOM 对象使用不同的垃圾收集。因此闭包在IE 的这些版本中会导致一些特殊的问题。具体来说，如果闭包的作用域链中保存着一个HTML 元素，那么就意味着该元素将无法被销毁。

## 原型链
- 什么是原型链
  原型链就是多个对象通过 `__proto__` 的方式连接了起来
- 继承的原型链
  ```
  function Parent(value){
  	this.value = value
  }
  Parent.prototype.getValue = function(){
  	return this.value
  }
  function Child(value){
  	Parent.call(this, value)
  }
  Child.prototype = new Parent()
	```

## 网络请求方式
- get
  用来获取数据，一般用来查询
- post
  用来改变服务器的数据，常用来数据提交，新增等
- put
  与post类似，但是put侧重于数据的修改，post侧重于数据的新增
- delete
  删除服务器的资源
- options
  浏览器预检请求

GET请求由于参数在链接上面，因此url长度会根据浏览器以及服务器的不同有不同的限制，最大长度并不是固定的，如果请求参数过长，会返回414错误</br>
- IE：对URL的最大限制为2083个字符，若超出这个数字，提交按钮没有任何反应。
- Firefox：对Firefox浏览器URL的长度限制为：65536个字符。
- Safari：URL最大长度限制为80000个字符。
- Opera：URL最大长度限制为190000个字符。
- Google(chrome)：URL最大长度限制为8182个字符。
- Apache(Server)：能接受的最大url长度为8192个字符
- Microsoft Internet Information Server(IIS)：n能接受最大url的长度为16384个字符。

## 模块化
1. 解决命名冲突
2. 提供复用性
3. 提高代码的可维护性

- CommonJS
  - 通过`module.exports = xxx`或者`exports.xxx = xxx`将文件导出
  - 通过`require()`引入</br>

  module是node中的一个变量，基本实现：
  ```
   let module = {
     id: 'xxx',
     exports:{}
   }

   let exports = module.exports
  ```
- ES Module
  ```
  //引入
  import xxx from 'xxx'
  import {xxx} from 'xxx'
  //导出
  export function a(){}
  export default function(){}
  ```

  ES Module 和 CommonJS区别
  - CommonJS支持动态导入而ES Module通常是静态导入，但是也可以使用import()动态导入
  - CommonJS是同步导入，ES Module是异步导入，因此可以用于浏览器，下载文件等
  - CommonJS导出的只是拷贝值，即使导出的值发生变化，导入的值也不会改变，ES Module采用的是实时绑定的方式，导入导出指向同一个内存地址，因此会发生变化
  - ES Module会被编译成require/exports来执行

## webpack
webpack会通过entry读取入口文件，然后根据入口文件获取入口文件所需要的依赖文件，最后导出output设置好的bundle文件，bundle文件是一个自执行函数：
```
;(function(modules){
  function require(moduleId){
    const module = {exports:{}}
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
  require('./entry.js')
})({
  './entry.js': function(module, exports, require){
    var _a = require('./a.js')
    console.log(_a.default)
  },
  './a.js': function(module, exports, require){
    var a = 1
    exports.default = a
  }
})
```
结构就是这样通过执行函数，参数是一个对象，对象由`moduleId: function(module, exports, require){}`一个个这样的结构组成，可以根据依赖一个个进行引用</br>
具体过程是通过读取入口文件，将入口文件转化为ast进行解析，遍历ast将所有依赖放入一个数组中，最后在打包的时候循环遍历依赖数组生成参数对象，并将其和函数拼接在一起，生成设置好的output文件。

## vdom
通过原生的JS对象去描述一个DOM节点，它比创建一个DOM的代价要小很多。
```
vnode{
  tag,
  data,
  key,
  children,
  text,
}
```
vdom好处
1. 解决浏览器性能问题，可以先通过js模拟dom通过diff算法优化更新，最后再交由浏览器去绘制
2. 把渲染过程抽象化了，从而使得组件的抽象能力也得到提升
3. 因为node端是没有dom元素的，所以vdom可以更好的实现SSR，同构渲染
4. 可以实现框架的跨平台

## websocket优势劣势
普通HTTP
- HTTP是半双工协议 同一时刻只能单向流动
- HTTP中服务器不能主动推送数据给客户端
双向通信
- 轮询
  - 客户端和服务器之间一直进行连接，每隔一段时间发送一次
- 长轮询
  - 对轮询进行改进，客户端发送HTTP给服务器，如果没有新消息就一直等待，当有消息时，才会返回客户端，然后客户端重新发送HTTP给服务器继续等待
- ifream流
  - 通过在页面上嵌入一个隐藏的ifream，设置ifream的src属性为请求，就可以源源不断的往客户端推送数据
- EventSource流(Server Sent Event)
  - 客户端向服务端订阅一条流，之后服务端可以发送消息给客户端直到客户端或者服务端关闭该流
  - 单向的只能从服务端向客户端发送流，且格式固定`Content-Type: text/event-stream`，内容格式也是确定好的
- WebSocket
  - 在客户端和服务端保持一个持久的连接，两边都可以在任何时间开始发送数据
  - 属于应用层协议，基于TCP传输协议，复用HTTP的握手通道
  - 全双工通信，实时性强
  - 更好的二进制支持
  - 较少的控制开销。连接创建后，信息交互时协议控制的数据包头部较小
## mock数据
- 使用mockJS
- 在webpack的devServer配置before钩子，拦截请求返回mock数据

## 移动端适配
1. 解决移动端1px方案
根据dpr在媒体查询中使用`transform: scale()`
```
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
```
2. viewport
移动端配置视口，加一个meta标签
```
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```
3. rem适配
通过设置根元素的font-size使得rem在不同设备上自适应大小
```
(function (){
  //根据屏幕大小设置根元素
  function refreshRem() {
    var dom = document.documentElement
    dom.style.fontSize = dom.clientWidth / 750 * 100 + 'px'
  }
  refreshRem()
  window.addEventListener('resize', refreshRem, false)
})()
```
本质上，**用户使用更大的屏幕，是想看到更多的内容，而不是更大的字**，所以通过缩放来解决问题的方案是个过度方案。
4. vw vh布局
window.innerWidth和window.innerHeight等分为100份，每份就是1vw 1vh，vmin是宽高中最小的数值，vmax是宽高中最大的数值，在webpack中可以使用`postcss-px-to-viewport`进行转化
5. px为主 rem vw vh为辅 使用flex布局
6. 移动端适配流程
  - 在head中设置viewport width=device-width的meta
  - 在css中使用px
  - 在适当场景使用flex布局，配合vw进行自适应
  - 在跨设备类型使用媒体查询
  - 如果跨设备类型交互差异过大，考虑分开项目开发