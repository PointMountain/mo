(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{364:function(e,t,v){"use strict";v.r(t);var n=v(33),_=Object(n.a)({},(function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h2",{attrs:{id:"为什么要做前端监控"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#为什么要做前端监控"}},[e._v("#")]),e._v(" 为什么要做前端监控")]),e._v(" "),v("ul",[v("li",[e._v("更快发现问题和解决问题")]),e._v(" "),v("li",[e._v("做产品的决策依据")]),e._v(" "),v("li",[e._v("提升前端工程师的技术深度和广度")]),e._v(" "),v("li",[e._v("为业务扩展提供了更多可能性")])]),e._v(" "),v("h2",{attrs:{id:"前端监控目标"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#前端监控目标"}},[e._v("#")]),e._v(" 前端监控目标")]),e._v(" "),v("ul",[v("li",[e._v("稳定性\n"),v("ul",[v("li",[e._v("JS错误")]),e._v(" "),v("li",[e._v("资源异常")]),e._v(" "),v("li",[e._v("接口错误")]),e._v(" "),v("li",[e._v("白屏")])])]),e._v(" "),v("li",[e._v("用户体验\n"),v("ul",[v("li",[e._v("加载时间")]),e._v(" "),v("li",[e._v("首字节时间")]),e._v(" "),v("li",[e._v("首次绘制")]),e._v(" "),v("li",[e._v("首次内容绘制")]),e._v(" "),v("li",[e._v("首次有意义绘制")]),e._v(" "),v("li",[e._v("首次输入延迟")])])]),e._v(" "),v("li",[e._v("业务\n"),v("ul",[v("li",[e._v("PV")]),e._v(" "),v("li",[e._v("UV")]),e._v(" "),v("li",[e._v("页面的停留时间")])])])]),e._v(" "),v("h2",{attrs:{id:"前端监控流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#前端监控流程"}},[e._v("#")]),e._v(" 前端监控流程")]),e._v(" "),v("p",[e._v("埋点 -> 数据采集 -> 数据建模存储 -> 数据传输（实时、批量）-> 数据统计（分析、挖掘）-> 数据可视化/报告和报警 =》改进埋点")]),e._v(" "),v("h2",{attrs:{id:"常见的埋点方案"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常见的埋点方案"}},[e._v("#")]),e._v(" 常见的埋点方案")]),e._v(" "),v("ul",[v("li",[e._v("代码埋点")]),e._v(" "),v("li",[e._v("可视化埋点->本质就是系统用来代替手工插入埋点代码")]),e._v(" "),v("li",[e._v("无痕埋点->所有事件都被记录下来")])]),e._v(" "),v("h2",{attrs:{id:"监控方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#监控方式"}},[e._v("#")]),e._v(" 监控方式")]),e._v(" "),v("ol",[v("li",[e._v("当JavaScript代码错误或者引入资源错误的时候通过"),v("code",[e._v("window.addEventListener('error', (event)=>{})")]),e._v("进行监听，然后根据"),v("code",[e._v("event.target.src || event.target.href")]),e._v("是否有值判断是js错误还是资源错误，如果有值，则是资源错误")]),e._v(" "),v("li",[e._v("当Promise发送错误，比如未catch之类需要通过"),v("code",[e._v("window.addEventListener('unhandledrejection',(event)=>{})")]),e._v("进行监听，然后进行数据收集")]),e._v(" "),v("li",[e._v("接口错误的监控前端需要重写"),v("code",[e._v("XMLHttpRequest.prototype.open")]),e._v("和"),v("code",[e._v("XMLHttpRequest.prototype.send")]),e._v("，并监听"),v("code",[e._v("load, error, abort")]),e._v("事件从而获取请求的数据以及错误信息")]),e._v(" "),v("li",[e._v("白屏错误的监控可以通过在可视范围内选取多个点，通过"),v("code",[e._v("document.elementsFromPoint(pointX, pointY)")]),e._v("拿到点所在的dom元素，之后根据dom属性进行判断是否白屏，如果超过规定数量的点都是白屏点，则认为页面发送白屏")])]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("//可以通过屏幕横竖画十字的点进行判断\nfor (let i = 1; i < 9; i++) {\n\t//elementsFromPoint() 方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素。\n\tlet xElements = document.elementsFromPoint(\n\t\twindow.innerWidth * i / 10,window.innerHeight / 2)  //x轴从左到右9个点\n\tlet yElements = document.elementsFromPoint(\n\t\twindow.innerWidth / 2, window.innerHeight * i / 10)  //y轴从上到下9个点\n\tisWrapper(xElements[0]) //判断最内部元素是否是白屏点\n\tisWrapper(yElements[0])\t//判断最内部元素是否是白屏点\n}\n")])])]),v("p",[e._v("需要注意的是白屏监听要在页面加载完之后因此需要判断"),v("code",[e._v("document.readyState === 'complete'")]),e._v("否则需要"),v("code",[e._v("window.addEventListener('load', listener)")]),e._v("\n5. 用户体验指标中需要获取浏览器渲染的各个阶段时间，需要用"),v("code",[e._v("performance.timing")]),e._v("中的各个时间属性，之后再计算出自己想要的时间，发送给服务器，需要注意的是因为这些时间是需要在加载完之后才可以获取的因此需要监听\t"),v("code",[e._v("load")]),e._v("才可以\n6. 还有页面元素属性 "),v("code",[e._v("FMP LCP")]),e._v("等需要"),v("code",[e._v("PerformanceObserve")]),e._v("进行创建\neg:")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("new PerformanceObserve((entryList, observe)=>{\n\tlet perfEntries = entryList.getEntries()\n\tLCP = perfEntries[0]\n\tobserve.disconnect() //不再观察了\n}).observe({entryType: ['largest-contentful-paint']})\n")])])]),v("blockquote",[v("p",[e._v("观察FMP 即页面中有意义的元素，是需要单独为dom元素设置属性"),v("code",[e._v("elementtiming")]),e._v("，才会被识别")])])])}),[],!1,null,null,null);t.default=_.exports}}]);