(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{339:function(t,a,s){"use strict";s.r(a);var e=s(33),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"js的数据类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js的数据类型"}},[t._v("#")]),t._v(" JS的数据类型")]),t._v(" "),s("p",[t._v("原始类型\nNumber Boolean String Symbol undefined null\n引用类型\nObject Array Function")]),t._v(" "),s("ul",[s("li",[t._v("typeof 只能判断原始类型和Function")]),t._v(" "),s("li",[t._v("instanceof 原理是判断是否有同一个原型链")]),t._v(" "),s("li",[t._v("Object.prototype.toString.call() 通过对象内置的toString方法")])]),t._v(" "),s("h2",{attrs:{id:"for-循环和-foreach循环的区别在于？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#for-循环和-foreach循环的区别在于？"}},[t._v("#")]),t._v(" for 循环和 forEach循环的区别在于？")]),t._v(" "),s("p",[t._v("for是原生的 forEach是array中的一个方法")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("function flat(arr){\n\tconst result = []\n\n\tarr.forEach(i => {\n\t\tif(Array.isArray(i)){\n\t\t\tresult.push(...flat(i))\n\t\t}else{\n\t\t\tresult.push(i)\n\t\t}\n\t})\n\treturn result\n}\n")])])]),s("h2",{attrs:{id:"this指向"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#this指向"}},[t._v("#")]),t._v(" this指向")]),t._v(" "),s("ul",[s("li",[t._v("new出来的就是绑定到新的对象上\n"),s("code",[t._v("let son = new Parent()")]),t._v("此时this就是绑定到son上的无法更改")]),t._v(" "),s("li",[t._v("箭头函数本身没有this，只取决于离他最近的普通函数的this，无法通过bind更改")]),t._v(" "),s("li",[t._v("对象调用的普通函数，this是对象")]),t._v(" "),s("li",[t._v("另外多bind链式绑定this只会根据第一个bind的内容进行绑定"),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("fn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \tconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//等价于")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("fn2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  \t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("[] == ![] => [] == false => [] == 0 => '' == 0 => 0 == 0\n")])])]),s("h2",{attrs:{id:"闭包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[t._v("#")]),t._v(" 闭包")]),t._v(" "),s("p",[t._v("函数A内有一个函数B，函数B可以访问的函数A中的变量，函数B就是闭包")]),t._v(" "),s("h2",{attrs:{id:"浅拷贝-拷贝第一层所有的属性到新的对象中，如果属性值是对象，还是拷贝的地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浅拷贝-拷贝第一层所有的属性到新的对象中，如果属性值是对象，还是拷贝的地址"}},[t._v("#")]),t._v(" 浅拷贝 拷贝第一层所有的属性到新的对象中，如果属性值是对象，还是拷贝的地址")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Object.assign\nArray.prototype.concat\n...运算符\n")])])]),s("h2",{attrs:{id:"深拷贝"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深拷贝"}},[t._v("#")]),t._v(" 深拷贝")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//最简单的方法 但有很多问题\nJSON.parse(JSON.stringify(object))\n//会忽略undefined 会忽略symbol 不能序列化函数，不能解决循环引用问题\n\n")])])]),s("h2",{attrs:{id:"原型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原型"}},[t._v("#")]),t._v(" 原型")]),t._v(" "),s("p",[t._v("原型的constructor指向构造函数\n构造函数的prototype指回原型\n"),s("code",[t._v("obj.__proto__ === obj.__proto__.constructor.prototype")]),t._v("\neg:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let son = new Parent()\nson的构造函数就是Parent\n所以 son.__proto__ === Parent.prototype\n")])])]),s("h2",{attrs:{id:"var-let-const"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#var-let-const"}},[t._v("#")]),t._v(" var let const")]),t._v(" "),s("p",[t._v("var会在解析的时候导致变量提升\nvar a = 1语法解析的时候会在最上面先声明var a\n之后进行赋值操作a=1\nlet const不会发生变量提升 但是会存在一个暂时性死区")]),t._v(" "),s("h2",{attrs:{id:"模块化好处"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块化好处"}},[t._v("#")]),t._v(" 模块化好处")]),t._v(" "),s("ul",[s("li",[t._v("解决命名冲突")]),t._v(" "),s("li",[t._v("提高代码可重用性")]),t._v(" "),s("li",[t._v("提高代码的可维护性")])]),t._v(" "),s("h2",{attrs:{id:"线程-进程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#线程-进程"}},[t._v("#")]),t._v(" 线程 进程")]),t._v(" "),s("p",[t._v("进程由多个线程组成，一个线程描述了执行一段指令所需的时间\n进程描述了CPU在运行指令及加载和保存上下文所需的时间")]),t._v(" "),s("p",[t._v("类比 一个浏览器的tab页就是一个进程，里面包含了js引擎线程，渲染线程，http请求线程等")]),t._v(" "),s("p",[t._v("单线程的好处：节省内存，节省上下文切换时间，没有锁的问题")]),t._v(" "),s("h2",{attrs:{id:"执行栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行栈"}},[t._v("#")]),t._v(" 执行栈")]),t._v(" "),s("p",[t._v("存储函数调用的栈结构 先进后出\n爆栈 -> 执行栈存放是有限制的，存放过多就会导致爆栈一般出现在递归中")]),t._v(" "),s("h2",{attrs:{id:"event-loop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event-loop"}},[t._v("#")]),t._v(" Event Loop")]),t._v(" "),s("p",[t._v("宏任务 script、setTimeout、setImmediate、setInterval、I/O、UI rendering\n微任务 promise、process.nextTick、MutationObserve")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("浏览器中\n当遇到异步函数时，会将函数挂起然后放到不同的task队列中\n浏览器中的Event Loop先执行同步函数，当执行栈为空时，就会从task中拿出异步代码执行，\n首先会将挂起的微任务队列中的微任务执行完，然后继续从宏任务队列中拿一个宏任务 执行完后再从微任务队列中执行微任务，依次执行")])]),t._v(" "),s("li",[s("p",[t._v("Node中")]),t._v(" "),s("ul",[s("li",[t._v("timers 执行setTimeout setInterval回调")]),t._v(" "),s("li",[t._v("I/O 执行上一轮少数未执行的I/O回调")]),t._v(" "),s("li",[t._v("idle prepare")]),t._v(" "),s("li",[t._v("poll\n"),s("ul",[s("li",[t._v("回到timer执行回调 执行I/O回调")]),t._v(" "),s("li",[t._v("如果没有timer的话 如果poll不为空 会遍历执行回调队列同步执行直至队列为空或者达到系统限制；如果poll为空 如果有setImmediate会跳到check执行，如果没有的话会一直等待新的回调 然后执行（有超时设置）")])])]),t._v(" "),s("li",[t._v("check 执行setImmediate")]),t._v(" "),s("li",[t._v("close callbacks  执行close事件的callback")])])])]),t._v(" "),s("h2",{attrs:{id:"垃圾回收机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收机制"}},[t._v("#")]),t._v(" 垃圾回收机制")]),t._v(" "),s("p",[t._v("新生代算法和老生代算法")]),t._v(" "),s("ul",[s("li",[t._v("新生代算法\n对象一般存活时间较短 From To两个空间一个是使用的一个是空闲的，新的变量放到From中 当From中的对象满了就会开启新生代垃圾回收，将失活的清除，将存活的放到To中，之后将两个空间互换")]),t._v(" "),s("li",[t._v("老生代算法\n对象存活时间较长切数量较多 使用标记清除算法和标记压缩算法")])]),t._v(" "),s("h2",{attrs:{id:"事件触发三个阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件触发三个阶段"}},[t._v("#")]),t._v(" 事件触发三个阶段")]),t._v(" "),s("p",[t._v("先从window往事件触发处捕获，遇到注册的捕获事件会触发\n传播到事件触发处触发注册事件\n从事件触发处往window传播，遇到注册的冒泡事件会触发")]),t._v(" "),s("h2",{attrs:{id:"跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域"}},[t._v("#")]),t._v(" 跨域")]),t._v(" "),s("p",[t._v("浏览器出于安全考虑，有同源策略。端口号、域名、协议有一个不同就是跨域\najax请求就会失败\n目的：防止CSRF攻击 实际还是会发送请求，只是会被拦截，所以还是存在CSRF风险")]),t._v(" "),s("h3",{attrs:{id:"解决跨域办法："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决跨域办法："}},[t._v("#")]),t._v(" 解决跨域办法：")]),t._v(" "),s("ul",[s("li",[t._v("JSONP 通过script标签的src传参并提供一个回调函数进行后续操作")]),t._v(" "),s("li",[t._v("CORS 设置 "),s("code",[t._v("Access-Control-Allow-Origin")])]),t._v(" "),s("li",[t._v("document.domain "),s("code",[t._v("document.domain = 'xxx.com'")]),t._v(" 但是只能用于二级域名都相同的情况")]),t._v(" "),s("li",[t._v("postMessage"),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("  window.parent.postMessage('message','http://test.com')\n\n  var mc = new MessageChannel()\n  mc.addEventListener('message', event => {\n  \tvar origin = event.origin || event.originalEvent.origin\n\tif (origin === 'http://test.com') {\n\t  console.log('验证通过')\n\t}\n  })\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"存储"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#存储"}},[t._v("#")]),t._v(" 存储")]),t._v(" "),s("p",[t._v("cookie localStorage sessionStorage indexDB")]),t._v(" "),s("h2",{attrs:{id:"浏览器缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器缓存"}},[t._v("#")]),t._v(" 浏览器缓存")]),t._v(" "),s("p",[t._v("优先级\nService Worker\nMemory Cache\nDisk Cache\nPush Cache\n网络请求")]),t._v(" "),s("ul",[s("li",[t._v("Service Worker\n它是运行在浏览器背后的独立线程，可以用来实现缓存功能，但是传输协议必须是HTTPS，因为其中涉及到请求拦截\n实现缓存分三步，首先注册Service Worker，然后监听到install事件之后就缓存需要的文件，之后用户就会从缓存中去获取")])]),t._v(" "),s("blockquote",[s("p",[t._v("无论从Memory Cache获取还是从网络请求中获取数据，浏览器都会显示从Service Worker中获取")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Memory Cache\n内存中的缓存 读取高效 但是持续性很短，会随着进程释放而释放，即关闭tab就会被清除\n一般大文件大概率不会放到内存中\n当内存中使用率过高时，文件会优先存入硬盘")])]),t._v(" "),s("li",[s("p",[t._v("Disk Cache\n可以根据HTTP Header上的字段判断哪些资源可以缓存，哪些资源可以不请求直接使用，哪些资源过期需要重新请求")])]),t._v(" "),s("li",[s("p",[t._v("Push Cache\nHTTP/2中的内容 只有以上三种都未命中时才会被使用，缓存时间很短，只在Session中存在，会话结束后就被释放")])])]),t._v(" "),s("h2",{attrs:{id:"缓存策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存策略"}},[t._v("#")]),t._v(" 缓存策略")]),t._v(" "),s("ul",[s("li",[t._v("强缓存 缓存期间不需要请求 state code为200\n"),s("ul",[s("li",[t._v("Expires HTTP/1的产物 后面加时间表示会在该时间后失效，但是受限于本地时间，如果修改本地时间可能会导致缓存失效")]),t._v(" "),s("li",[t._v("Cache-Control HTTP/1.1优先级高于Expires，可以在请求头或者响应头中设置，且有多种指令\nno-store no-cache public private max-age等")])])]),t._v(" "),s("li",[t._v("协商缓存\n如果缓存过期了需要验证资源是否更新，如果资源没有发生改变，state code为304，然后更新浏览器缓存有效期\n"),s("ul",[s("li",[t._v("Last-Modified If-Modified-Since\nIf-Modified-Since将Last-Modified发送给服务端，有弊端，Last-Modified表示文件最后修改日期，如果只是打开不更改，也会造成其被修改，且只能以秒计时，如果在无法感知的时间内完成，也会造成命中而不会更新")]),t._v(" "),s("li",[t._v("ETag If-None-Match 优先级高 If-None-Match将当前ETag发送给服务器，根据ETag是否变化来决定是否需要重新请求")])])])]),t._v(" "),s("h2",{attrs:{id:"浏览器渲染原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染原理"}},[t._v("#")]),t._v(" 浏览器渲染原理")]),t._v(" "),s("p",[t._v("JS引擎 渲染引擎\n浏览器接收字节数据转化为字符串，字符串会被标记化打上token，token会转化为node节点，然后再根据node节点转化为DOM树\nCSS渲染类似\n字节数据=》字符串=》token=》node=》CSSOM\n所以html要避免无意义的标签css要避免过于具体多层的css选择器，最好可以层级扁平")]),t._v(" "),s("p",[t._v("DOM树和CSSOM树会组合为渲染树 render tree\n然后浏览器会根据渲染树进行布局（回流） 然后调用GPU绘制")]),t._v(" "),s("p",[t._v("JS操作DOM慢是因为JS是在JS线程上 而DOM是在渲染线程上，JS操作的话会进行线程间的通信，损耗性能，且操作DOM还可能发生重绘回流")]),t._v(" "),s("h2",{attrs:{id:"阻塞渲染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#阻塞渲染"}},[t._v("#")]),t._v(" 阻塞渲染")]),t._v(" "),s("p",[t._v("HTML和CSS会阻塞渲染，因为就是二者生成渲染树\nJS加载也会阻塞渲染\nscript上加defer属性，会让js并行下载，会在HTML解析完执行后再执行\nscript上加async属性，会让js并行下载，下载完完后就会执行")]),t._v(" "),s("h2",{attrs:{id:"重绘和回流"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重绘和回流"}},[t._v("#")]),t._v(" 重绘和回流")]),t._v(" "),s("p",[t._v("重绘是当节点需要改变的外观不影响布局\n回流是布局或者几何属性需要改变\n回流一定发生了重绘，重绘不一定发生回流")]),t._v(" "),s("p",[t._v("重绘与回流和Event Loop有关\n减少重绘回流")]),t._v(" "),s("ul",[s("li",[t._v("transform 代替 top")]),t._v(" "),s("li",[t._v("visibility 代替 display: none")]),t._v(" "),s("li",[t._v("不把节点的属性值放在一个循环里当变量")]),t._v(" "),s("li",[t._v("不使用table布局")]),t._v(" "),s("li",[t._v("动画实现速度越快 回流次数越多")]),t._v(" "),s("li",[t._v("css选择符从右往左匹配，减少层级")]),t._v(" "),s("li",[t._v("will-change等")])]),t._v(" "),s("h2",{attrs:{id:"性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#性能优化"}},[t._v("#")]),t._v(" 性能优化")]),t._v(" "),s("ul",[s("li",[t._v("通过减少代码文件的大小或减少书写嵌套函数减少编译时间")]),t._v(" "),s("li",[t._v("尽量保证传入参数类型一致，方便V8优化代码")]),t._v(" "),s("li",[t._v("图片方面优化，懒加载，雪碧图，小图片用base64，图标用svg，照片JPEG等")]),t._v(" "),s("li",[t._v("DNS预解析 dns-prefetch")]),t._v(" "),s("li",[t._v("节流 throttle")]),t._v(" "),s("li",[t._v("防抖 debounce")]),t._v(" "),s("li",[t._v("预加载 preload 不会阻塞onload事件")]),t._v(" "),s("li",[t._v("预渲染 prerender")]),t._v(" "),s("li",[t._v("懒执行")]),t._v(" "),s("li",[t._v("CDN加速")])]),t._v(" "),s("h2",{attrs:{id:"计算机网络"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算机网络"}},[t._v("#")]),t._v(" 计算机网络")]),t._v(" "),s("ul",[s("li",[t._v("应用层 HTTP FTP")]),t._v(" "),s("li",[t._v("传输层 TCP UDP")]),t._v(" "),s("li",[t._v("网络层")]),t._v(" "),s("li",[t._v("数据链路层")]),t._v(" "),s("li",[t._v("物理层")])]),t._v(" "),s("h2",{attrs:{id:"udp-tcp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#udp-tcp"}},[t._v("#")]),t._v(" UDP TCP")]),t._v(" "),s("ul",[s("li",[t._v("UDP\n"),s("ul",[s("li",[t._v("面向无连接")]),t._v(" "),s("li",[t._v("不可靠性")]),t._v(" "),s("li",[t._v("高效"),s("br"),t._v("\nUDP协议是面向无连接的，不需要在正式传输前建立连接，UDP只是数据报文的搬运工，不保证数据有序不丢失，UDP也没有任何控制流量的算法，所以相较TCP来说比较轻便")])])])]),t._v(" "),s("p",[t._v("发送过程也很简单 无需进行任何拆分可拼接")]),t._v(" "),s("p",[t._v("发送端应用层传递给传输层UDP协议 UDP加一个UDP头标识自己是UDP协议就继续传递给网络层\n接收端网络层传递给传输层，UDP只需要去掉UDP标识头就直接传递给应用层，不进行其他任何操作\nUDP不会备份任何数据，而且也不在乎对方是否收到数据\nUDP没有拥塞控制，会以一个恒定速度发送数据，当网络不好的时候就会造成丢包，但是对实时性要求高的场景却是优点\nUDP支持一对一、一对多、多对多、多对一的方式，支持单播，广播，多播的功能")]),t._v(" "),s("ul",[s("li",[t._v("TCP\nTCP需要先通过三次握手来建立连接，在传输过程中也通过各种算法保证数据的可靠性，所以导致并没有UDP那么高效\n标识符\nACK=1 该字段为一时表示字段有效，TCP规定连接建立后传送的所有报文段都必须把ACK置一\nSYN=1 当SYN=1 ACK=0时 表示当前报文段是一个连接请求报文。当SYN=1 ACK=1的时候，表示当前报文段是一个同意建立连接的应答报文")])]),t._v(" "),s("p",[t._v("三次握手\n第一次握手：客户端发送一个连接请求报文ACK=0 SYN=1 seq = x\n第二次握手：服务端收到连接请求报文，返回一个同意进行连接的报文ACK=1 SYN=1 ack=x+1 seq = y\n第三次握手：客户端收到同意进行连接报文，发送确认报文ACK=1 SYN=1 seq=x+1 ack=y+1\n第三次握手的原因防止出现实现的连接请求报文被服务端接收")]),t._v(" "),s("p",[t._v("四次挥手\n第一次挥手：客户端发送一个连接释放报文FIN=1 seq=u 进入FIN-WAIT-1阶段\n第二次挥手：服务端收到客户端的释放报文返回一个确认报文ACK=1 seq=v ack=u+1 进入CLOSE-WAIT阶段 这时客户端到服务端的连接关闭了，但是客户端还可以接受服务端传递的数据\n第三次挥手：服务端向客户端发送连接释放报文FIN=1 seq=w ack=u+1（和二次发送的确认报文序号一样）进入LAST-ACK阶段\n第四次挥手：客户端收到服务端的释放报文返回确认报文ACK=1 seq=u+1 ack=w+1进入TIME-WAIT阶段要等待2MSL才会彻底关掉。目的是为了确认服务端收到了确认报文，如果丢失还可以重新发送，还为了防止已实现的连接报文出现在本连接中")]),t._v(" "),s("h2",{attrs:{id:"arq协议"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arq协议"}},[t._v("#")]),t._v(" ARQ协议")]),t._v(" "),s("p",[t._v("超时重传机制 通过确认和超时机制保证数据正确送达")]),t._v(" "),s("ul",[s("li",[t._v("停止等待ARQ\n每次发送报文都会停止继续发送，并设置一个定时器，直到收到确认报文才会取消定时器，继续发送下一段报文。如果超过定时器时间就会重新发送丢失的数据，因此每次发送都会备份发送的数据，如果对端收到错误报文也会抛弃报文等待重传；如果对端的ACK超时会丢失，此时A端也会重传报文，对端收到后会丢弃该报文然后重传应答")]),t._v(" "),s("li",[t._v("连续ARQ\n通过发送窗口，把窗口内的分组发送给服务端，服务端返回确认后会继续往后发送，接收方一般是才用累计确认，在收到几个分组后将按序到达的最后一个分组发送确认，弊端是如果中间有分组丢失，接收方只能返回前面得分组，导致发送方进行回退，重新发送一些已发送的数据。")])]),t._v(" "),s("h2",{attrs:{id:"拥塞处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#拥塞处理"}},[t._v("#")]),t._v(" 拥塞处理")]),t._v(" "),s("ul",[s("li",[t._v("慢开始 指数级增长直到设置的慢开始门限")]),t._v(" "),s("li",[t._v("拥塞避免 线性增长使网络不容易出现拥塞")]),t._v(" "),s("li",[t._v("快速重传 如果个别报文段丢失，接收方会立即发送3次重复确认，发送方会确认丢失该报文，重新传送\n"),s("ul",[s("li",[t._v("TCP Taho 将慢开始门限设为拥塞窗口一半，将拥塞窗口设为1MSS，重新开始慢开始算法")]),t._v(" "),s("li",[t._v("TCP Reno 拥塞窗口减半，将门限设为拥塞窗口一半，进入快恢复阶段，开始拥塞避免算法")])])]),t._v(" "),s("li",[t._v("快恢复 如果只是个别报文段丢失而不是超时，会将门限值变为当前拥塞窗口的1/2，并且拥塞窗口也来到1/2开始拥塞避免算法")])]),t._v(" "),s("h2",{attrs:{id:"http请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http请求"}},[t._v("#")]),t._v(" HTTP请求")]),t._v(" "),s("p",[t._v("HTTP分为请求报文和响应报文，都由三部分组成")]),t._v(" "),s("ol",[s("li",[t._v("开始行（请求行/状态行）")]),t._v(" "),s("li",[t._v("首部行 用来说明浏览器服务器或报文主体的一些信息，结束后还有一行空格与实体隔开")]),t._v(" "),s("li",[t._v("实体主体")])]),t._v(" "),s("p",[t._v("get请求多用于无副作用，幂等的场景，例如搜索关键字；post多用于有副作用，不幂等的情况，例如注册\nget请求能缓存，post不能\nget请求放到url中会被浏览器保存记录，post不会，url长度有限制，post支持更多编码类型且不对数据类型限制")]),t._v(" "),s("h2",{attrs:{id:"常见状态码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见状态码"}},[t._v("#")]),t._v(" 常见状态码")]),t._v(" "),s("ul",[s("li",[t._v("1xx表示通知信息")]),t._v(" "),s("li",[t._v("2xx表示成功")]),t._v(" "),s("li",[t._v("3xx表示重定向")]),t._v(" "),s("li",[t._v("4xx表示客户差错")]),t._v(" "),s("li",[t._v("5xx表示服务器差错")])]),t._v(" "),s("h2",{attrs:{id:"tls"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tls"}},[t._v("#")]),t._v(" TLS")]),t._v(" "),s("p",[t._v("HTTPS通过HTTP来传输信息，但是信息通过TLS协议进行加密\nTLS位于传输层之上应用层之下")]),t._v(" "),s("ul",[s("li",[t._v("对称加密 两边都拥有相同的秘钥进行加密解密，但是如果直接通过网络方式传播秘钥，被拦截后加密就失去意义")]),t._v(" "),s("li",[t._v("非对称加密 有公钥私钥之分，公钥所有人都知道，但是数据解密需要私钥，私钥只有分发公钥的人知道。公钥加密，私钥解密")])]),t._v(" "),s("p",[t._v("TLS握手\n第一次 ClientHello 客户端发放一个随机值以及需要的协议和加密方法\n第二次 ServerHello 服务端收到随机值，自己也产生一个随机值，并根据客户端需要的协议和加密方法使用对应方式，发送自己的证书\n第三次 客户端收到后验证是否有效，有效的话会生成第三个随机值通过公钥加密，然后把自己的证书还有随机值发送给服务端，服务端收到之后通过私钥解密随机值，至此，两端将三个随机值组合成秘钥开始进行对称加密")]),t._v(" "),s("h2",{attrs:{id:"http-2-http-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-2-http-3"}},[t._v("#")]),t._v(" HTTP/2 HTTP/3")]),t._v(" "),s("p",[t._v("HTTP/2使用多路复用\nHTTP/1 中同一个域名下请求数量是有限制的，当请求很多资源时，队头阻塞会导致到达最大请求数量时，剩余资源需要等待其他资源请求完才可以再请求\nHTTP/2 使用了多路复用，通过一个TCP连接可以传输所有的请求数据\nHTTP/2中有帧（frame）和流（stream）帧代表最小的数据单位，每个帧都会标识出该帧属于哪个流，流由多个帧组成。多路复用就是在一个TCP连接中可以存在多个流，对端通过帧中的标识确定属于哪个请求，这样就可以避免之前HTTP版本中的队头堵塞，提高传输性能。")]),t._v(" "),s("p",[t._v("HTTP/2使用二进制传输\n在之前的HTTP版本中都是通过文本的方式传输数据，在HTTP/2中引入新的编码机制，所有传输的数据被分割，采用二进制格式编码")]),t._v(" "),s("p",[t._v("HTTP/2使用Header压缩\n在HTTP/1中 使用文本的形式传输Header，如果header中存在cookie的情况下，可能每次都需要重复传输很多字节\n在HTTP/2中 使用了HPACK压缩格式对header进行编码，减少了header大小。而且在两端维护了索引表，会记录已出现的header，这样出现过的header、就可以通过传键名，在对端根据键名进行获取")]),t._v(" "),s("p",[t._v("HTTP/2使用服务端Push\n在HTTP/2中，服务端可以根据客户端某个请求后，主动推送其他资源，减少一点延迟时间，当然浏览器兼容的情况下也可以使用prefetch")]),t._v(" "),s("p",[t._v("HTTP/3\nHTTP/2由于TCP协议的关系，在实现多路复用的情况下，如果出现丢包，性能的消耗反而会比HTTP/1还大，因为多路复用只有一个TCP连接。所以HTTP/3使用了新的协议QUIC")]),t._v(" "),s("p",[t._v("QUIC基于UDP，又取了TCP中的精华，实现既快又可靠的协议")]),t._v(" "),s("ul",[s("li",[t._v("多路复用：不同于HTTP/2在一个TCP连接中的多路复用，QUIC本身就支持多路复用，并且传输的单个数据流可以保证有序交付且不会影响其他数据流，解决了TCP中的问题。而且TCP是基于IP和端口去识别连接的，但是QUIC是基于ID的方式去识别，只要ID不变，就能迅速重连")]),t._v(" "),s("li",[t._v("0-RTT 通过使用类似TCP快速打开技术，缓存当前会话上下文，在下次恢复会话时，将上下文传递给服务端验证通过就可以进行传输了")]),t._v(" "),s("li",[t._v("纠错机制 假如要发三个包，那么协议会根据三个包异或值单独发一个校验包，如果三个包有一个丢失，可以根据校验包计算出丢失包的内容，但是如果多个包丢失就无法使用纠错机制了，只能使用重传")])]),t._v(" "),s("h2",{attrs:{id:"输入url到页面渲染的整个流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输入url到页面渲染的整个流程"}},[t._v("#")]),t._v(" 输入URL到页面渲染的整个流程")]),t._v(" "),s("p",[t._v("DNS解析 DNS基于UDP协议对域名进行解析，获取到IP，之后跳转到IP\n之后客户端会和服务端建立连接 TCP三次握手\n建立TCP连接后会进行TLS握手\n完成后进行HTTP请求 服务端响应请求返回HTML文件\nHTML渲染，HTML获取的时候是二进制码，先转化为字符串，之后标记化，然后组成node，最后变成DOM树 ，CSS同理，如果有不属于async或defer的js会先阻塞DOM和CSSOM过程，先执行js，加载外部资源等操作，js执行完后会继续生成DOM树和CSSOM树，最终两个树会生成渲染树，此时浏览器就开始调用GUI进行绘制")]),t._v(" "),s("h2",{attrs:{id:"doctype作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#doctype作用"}},[t._v("#")]),t._v(" doctype作用")]),t._v(" "),s("p",[t._v("DOCTYPE声明位于文档最前面，处于标签之前，作用是告诉浏览器的解析器，要用什么文档类型规范来解析，同时也用来区分严格模式与混杂模式")]),t._v(" "),s("h2",{attrs:{id:"标签语义化的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标签语义化的作用"}},[t._v("#")]),t._v(" 标签语义化的作用")]),t._v(" "),s("ol",[s("li",[t._v("HTML机构清晰")]),t._v(" "),s("li",[t._v("代码可读性好")]),t._v(" "),s("li",[t._v("无障碍阅读")]),t._v(" "),s("li",[t._v("搜索引擎可以根据标签的语言确定上下文和权重")]),t._v(" "),s("li",[t._v("移动设备更完美展现页面")]),t._v(" "),s("li",[t._v("便于团队开发和维护")])]),t._v(" "),s("h2",{attrs:{id:"css选择器优先级"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css选择器优先级"}},[t._v("#")]),t._v(" CSS选择器优先级")]),t._v(" "),s("p",[t._v("内联 > id选择器 > 类选择器，属性选择器，伪类选择器 > 标签选择器，伪元素选择器")]),t._v(" "),s("h2",{attrs:{id:"浏览器同源策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器同源策略"}},[t._v("#")]),t._v(" 浏览器同源策略")]),t._v(" "),s("p",[t._v("同源策略是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源进行交互。它可以帮助阻隔恶意文档，减少被攻击的媒介。\n跨域\nJSONP\ndocument.domain\nCORS -》 Access-Control-Allow-Orign")]),t._v(" "),s("h2",{attrs:{id:"flex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flex"}},[t._v("#")]),t._v(" flex")]),t._v(" "),s("p",[t._v("flex-direction 主轴方向 row column\nflex-wrap 是否换行\nflex-flow flex-direction和flex-wrap的组合属性\njustify-content 主轴方向上的对齐方式 center space-between等\nalign-items 交叉轴的对齐方式 center baseline等 默认stretch是沾满容器高度\nalign-content 多根轴线的定义方式（设置了wrap且分行后才会生效）\norder项目的顺序 数值越小越靠前 默认为0\nflex-grow 项目放大的比例 默认为0 即空间即使变大项目也不变\nflex-shrink 项目缩小比例 默认为1 即空间缩小的话项目将缩小\nflex-basis 定义项目在分配多余空间之前占据主轴的空间，默认是auto即项目本来的大小\nflex 是flex-grow flex-shrink flex-basis缩写\nflex: auto => flex: 1 1 auto\nflex: none => flex: 0 0 auto")]),t._v(" "),s("h2",{attrs:{id:"git"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[t._v("#")]),t._v(" git")]),t._v(" "),s("p",[t._v("git merge --abort 放弃merge 使Git仓库回到merge前的状态\ngit rebase\ngit commit --amend修正上一次commit 将修改后的内容和当前commit里的内容合并起来成为一个新的commit然后替换掉\n修改倒数第二个\ngit rebase -i 目标comit\n然后在编辑页面指定需要修改的commit改为edit\n之后使用git commit --amend\n最后git rebase continue\n~x表示后移x位commit\n^数量表示前移多少位")]),t._v(" "),s("p",[t._v("撤销提交git reset --hard 目标commit\n另一种撤销提交git revert 这个是提交了一次反转上个commit的commit")]),t._v(" "),s("p",[t._v("git stash\ngit stash pop")])])}),[],!1,null,null,null);a.default=n.exports}}]);