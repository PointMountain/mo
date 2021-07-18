(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{369:function(v,_,t){"use strict";t.r(_);var l=t(33),a=Object(l.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h2",{attrs:{id:"页面中图片加载效果"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#页面中图片加载效果"}},[v._v("#")]),v._v(" 页面中图片加载效果")]),v._v(" "),t("ul",[t("li",[v._v("由模糊到清晰是小波算法")]),v._v(" "),t("li",[v._v("逐行显示是离散余弦变换")])]),v._v(" "),t("h2",{attrs:{id:"css-sprites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css-sprites"}},[v._v("#")]),v._v(" CSS-Sprites")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("background-position")])]),v._v(" "),t("li",[t("code",[v._v("background-size")])])]),v._v(" "),t("h2",{attrs:{id:"响应式动态图片加载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#响应式动态图片加载"}},[v._v("#")]),v._v(" 响应式动态图片加载")]),v._v(" "),t("ul",[t("li",[v._v("一个默认图片")]),v._v(" "),t("li",[v._v("把屏幕分辨率信息带给服务器")]),v._v(" "),t("li",[v._v("用服务器返回更优质图片\n"),t("code",[v._v("<picture></picture>")])])]),v._v(" "),t("h2",{attrs:{id:"播放器形式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#播放器形式"}},[v._v("#")]),v._v(" 播放器形式")]),v._v(" "),t("ul",[t("li",[v._v("video标签\n"),t("ul",[t("li",[v._v("优点 不需要下载额外资源，控制简单有较为完整的api")]),v._v(" "),t("li",[v._v("缺点 每个浏览器的外观不同，如果统一需要自己来适配不同的浏览器")])])]),v._v(" "),t("li",[v._v("flash\n"),t("ul",[t("li",[v._v("优点 兼容性好，只要有flash player播放器插件，都可以进行播放")]),v._v(" "),t("li",[v._v("缺点\n"),t("ul",[t("li",[v._v("需要下载额外的swf播放文件，浏览器必须有flash player插件")]),v._v(" "),t("li",[v._v("flash player版本的碎片化")]),v._v(" "),t("li",[v._v("UI定制需要写as")])])])])])]),v._v(" "),t("h2",{attrs:{id:"视频优化解决问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#视频优化解决问题"}},[v._v("#")]),v._v(" 视频优化解决问题")]),v._v(" "),t("ul",[t("li",[v._v("设计师要求按照设计图做播放器")]),v._v(" "),t("li",[v._v("让用户第一时间就能看到视频\n"),t("ul",[t("li",[v._v("把初始化播放器的代码的执行顺序提前")]),v._v(" "),t("li",[v._v("把播放器所需文件的加载顺序提前")])])])]),v._v(" "),t("h2",{attrs:{id:"前端缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端缓存"}},[v._v("#")]),v._v(" 前端缓存")]),v._v(" "),t("ul",[t("li",[v._v("sessionStorage")]),v._v(" "),t("li",[v._v("localStorage")]),v._v(" "),t("li",[v._v("userData（IE）")]),v._v(" "),t("li",[v._v("Cookie")]),v._v(" "),t("li",[v._v("openDatabase=》已经不维护使用IndexedDB")])]),v._v(" "),t("h2",{attrs:{id:"浏览器底层渲染机制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器底层渲染机制"}},[v._v("#")]),v._v(" 浏览器底层渲染机制")]),v._v(" "),t("ol",[t("li",[v._v("从服务器获取需要渲染的内容(URL解析/DNS/TCP/HTTP...)")]),v._v(" "),t("li",[v._v("浏览器基于自己的渲染引擎(例如: webkit/gecko/trident/blink...)开始自上而下加载渲染代码")])]),v._v(" "),t("ul",[t("li",[v._v("从浏览器获取的是文件流(进制编码的内容)")]),v._v(" "),t("li",[v._v("浏览器首先会把16进制文件流转化为代码字符串")]),v._v(" "),t("li",[v._v("按照w3c规范进行字符解析，生成对应的tokens，最后转换为浏览器内核可以识别渲染的DOM节点")]),v._v(" "),t("li",[v._v("按照节点最后解析为对应的树DOM TREE/CSSOM TREE")])]),v._v(" "),t("blockquote",[t("p",[v._v("link 和 @import 都是导入外部样式(从服务器获取样式文件)\n遇到link 浏览器会派发一个新的线程(HTTP线程)去加载资源文件，与此同时GUI渲染线程会继续向下渲染代码\n遇到的是@import GUI渲染线程会暂时停止渲染，去服务器加载资源文件")])]),v._v(" "),t("blockquote",[t("p",[v._v("页面渲染第一步：在CSS资源还没有请求回来之前，先生成DOM树(DOM的层级关系/节点关系)\n页面渲染第二步：当所有的CSS请求回来之后，浏览器按照CSS的导入顺序，依次进行渲染，最后生成CSSOM树\n页面渲染第三步：把DOM树和CSSOM树结合在一起，生成有样式，有结构的RENDER TREE渲染树\n最后一步：浏览器按照渲染树，在页面中进行渲染和解析\n1. 计算元素在设备视口中的大小和位置布局（Layout）或 重排/回流\n2. 根据渲染树以及回流得到的几何信息，得到节点的绝对像素 =》 绘制/重绘")])]),v._v(" "),t("h2",{attrs:{id:"crp性能优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#crp性能优化"}},[v._v("#")]),v._v(" CRP性能优化")]),v._v(" "),t("ol",[t("li",[v._v("减少DOM树渲染时间(HTML层级不要太深，标签语义化)")]),v._v(" "),t("li",[v._v("减少CSSOM树渲染时间(选择器是从右向左解析，所以尽可能减少选择器的层级)")]),v._v(" "),t("li",[v._v("减少HTTP请求次数和请求大小")]),v._v(" "),t("li",[v._v("一般会把CSS放在页面的开始位置(提前请求资源，用link别用@import，对于移动端中，如果CSS较少，尽可能才用内嵌式)")]),v._v(" "),t("li",[v._v("为了避免白屏，可以进来第一件事，快速生成一套 loading 的渲染树(前端骨架屏)，服务器的SSR骨架屏所提高的渲染是避免了客户端再次单独请求数据，而不是样式和结构")]),v._v(" "),t("li",[v._v("把JS放在页面底部以及尽可能使用defer或者async")])]),v._v(" "),t("h1",{attrs:{id:"前端性能优化原理与实践"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端性能优化原理与实践"}},[v._v("#")]),v._v(" 前端性能优化原理与实践")]),v._v(" "),t("h2",{attrs:{id:"从输入url到页面加载完成过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从输入url到页面加载完成过程"}},[v._v("#")]),v._v(" 从输入URL到页面加载完成过程")]),v._v(" "),t("ol",[t("li",[v._v("DNS解析（浏览器DNS缓存、DNS prefetch）")]),v._v(" "),t("li",[v._v("TCP连接 （长连接、预连接）")]),v._v(" "),t("li",[v._v("HTTP请求抛出")]),v._v(" "),t("li",[v._v("服务端处理请求，HTTP响应返回")]),v._v(" "),t("li",[v._v("浏览器拿到响应数据，解析响应内容，把解析的结果展示给用户")])]),v._v(" "),t("h2",{attrs:{id:"http优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http优化"}},[v._v("#")]),v._v(" HTTP优化")]),v._v(" "),t("ul",[t("li",[v._v("减少请求次数")]),v._v(" "),t("li",[v._v("减少单次请求所花费的时间\n解决方法是进行资源的压缩与合并 可以从webpack方面入手")])]),v._v(" "),t("p",[v._v("webpack方面的优化")]),v._v(" "),t("ol",[t("li",[v._v("构建过程消耗时间 -》优化打包时间")]),v._v(" "),t("li",[v._v("打包结果过大 -》 优化打包大小")])]),v._v(" "),t("p",[v._v("优化打包时间：")]),v._v(" "),t("ol",[t("li",[v._v("优化loader "),t("br"),v._v("\nbabel-loader使用CacheDirectory缓存，使用include/exclude过滤")]),v._v(" "),t("li",[v._v("将第三方库单独提取出来，通过DllPlugin将第三方库单处抽取出来，不会再跟着业务代码一起被重新打包，只有当依赖自身版本变化了才会重新打包 "),t("br"),v._v(" "),t("code",[v._v("//打包出dll库 \tplugins:[ \t\tnew webpack.DllPlugin({ \t\t\tname: '', \t\t\tpath: xxx, \t\t\tcontext: xxx \t\t}) \t] \t//引入dll库 \tplugin:[ \t\tnew webpack.DllReferencePlugin({ \t\t\tcontext: xxx, \t\t\tmainfest: require('xxx') \t\t}) \t]")])]),v._v(" "),t("li",[v._v("HappyPack 将loader由单线程变为多线程")])]),v._v(" "),t("p",[v._v("优化打包大小")]),v._v(" "),t("ol",[t("li",[v._v("拆分资源")]),v._v(" "),t("li",[v._v("删除冗余代码 Tree-Shaking webpack现在自带mode设为production")]),v._v(" "),t("li",[v._v("按需加载require.ensure或者import()")])]),v._v(" "),t("h2",{attrs:{id:"图片优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#图片优化"}},[v._v("#")]),v._v(" 图片优化")]),v._v(" "),t("ul",[t("li",[v._v("图片选择方案\n"),t("ul",[t("li",[v._v("JPEG/JPG 有损压缩，体积小，加载快，不支持透明"),t("br"),v._v("\n常用于呈现色彩丰富的图片，作为背景图，轮播图或banner图出现\n"),t("ul",[t("li",[v._v("PNG-8 PNG-24 无损压缩盘，质量高，体积大，支持透明"),t("br"),v._v("\n弥补了JPG无法透明的局限，但是体积变大，主要用于呈现小logo，颜色鲜明且对比强烈的图片或背景。8支持2^8 256种颜色，24支持2^24 1600万种颜色")]),v._v(" "),t("li",[v._v("svg 文本文件，科知局写到HTML中，体积小，不失真，兼容性好"),t("br")]),v._v(" "),t("li",[v._v("Base64 文本文件，依赖编码，小图标解决方案"),t("br"),v._v("\n对图片进行Base64编码，直接将编码结果写入HTML或者CSS而无需进行请求，但是体积会变成原来的4/3，因此不适合用于大文件 webpack中的url-loader limit\n也不适合频繁更新的图片")]),v._v(" "),t("li",[v._v("雪碧图CSS Sprites")]),v._v(" "),t("li",[v._v("webP 性能好，但是兼容性非常差")])])])])]),v._v(" "),t("li",[v._v("懒加载Lazy-Load\n通过div进行一个占位，当div出现在可视范围内，div内元素会被瞬间写入url，图片得以呈现。")])]),v._v(" "),t("h2",{attrs:{id:"css优化（css选择符是从右到左进行匹配的）"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css优化（css选择符是从右到左进行匹配的）"}},[v._v("#")]),v._v(" CSS优化（CSS选择符是从右到左进行匹配的）")]),v._v(" "),t("ol",[t("li",[v._v("避免使用通配符 因为通配符会让浏览器遍历所有元素")]),v._v(" "),t("li",[v._v("关注可以继承的属性，避免重复定义")]),v._v(" "),t("li",[v._v("少用标签选择器")]),v._v(" "),t("li",[v._v("id选择器和class选择器不要被多余的标签选择器拖累")]),v._v(" "),t("li",[v._v("减少嵌套")])]),v._v(" "),t("h2",{attrs:{id:"dom操作优化（js引擎和渲染引擎是独立实现的，js修改dom本质上是引擎之间进行交流）"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dom操作优化（js引擎和渲染引擎是独立实现的，js修改dom本质上是引擎之间进行交流）"}},[v._v("#")]),v._v(" DOM操作优化（JS引擎和渲染引擎是独立实现的，JS修改DOM本质上是引擎之间进行交流）")]),v._v(" "),t("ol",[t("li",[v._v("减少DOM操作，通过JS给DOM操作减压 例如：DOM Fragment")]),v._v(" "),t("li",[v._v("EventLoop 每次循环过程：执行一个宏任务 之后执行一队微任务 之后执行渲染操作，更新界面，最后处理worker相关的任务 为了保证立刻更新最好将DOM、操作放入微任务当中，如果宏任务可能当次循环不会被立刻执行")]),v._v(" "),t("li",[v._v("JS获取元素布局属性 因为需要确保即时性和准确性，会触发回流，进行即时计算，所以使用时要将它们缓存起来，避免频繁获取")]),v._v(" "),t("li",[v._v("JS修改样式的时候，可以直接添加类"),t("code",[v._v("element.classList.add()")]),v._v("，而不是用"),t("code",[v._v("element.style.width = 'xxx';element.style.height = 'xxx';")]),v._v("这样多次修改")]),v._v(" "),t("li",[v._v("也可以通过设置DOM "),t("code",[v._v("display: none;")]),v._v("使其离线，然后对它进行各种操作，操作完之后再设置"),t("code",[v._v("display: block;")]),v._v(" 这样就只触发两次回流")])]),v._v(" "),t("p",[v._v("flush队列\n浏览器会将DOM操作缓存到一个flush队列中，直到特定时间才会触发一次回流，而不是每次操作都进行回流，但是如果遇到的是获取即时性属性的操作，就会使flush队列的任务提前出列")])])}),[],!1,null,null,null);_.default=a.exports}}]);