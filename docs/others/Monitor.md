## 为什么要做前端监控
- 更快发现问题和解决问题
- 做产品的决策依据
- 提升前端工程师的技术深度和广度
- 为业务扩展提供了更多可能性

## 前端监控目标
- 稳定性
  - JS错误
  - 资源异常
  - 接口错误
  - 白屏
- 用户体验
  - 加载时间
  - 首字节时间
  - 首次绘制
  - 首次内容绘制
  - 首次有意义绘制
  - 首次输入延迟
- 业务
  - PV
  - UV
  - 页面的停留时间

## 前端监控流程
埋点 -> 数据采集 -> 数据建模存储 -> 数据传输（实时、批量）-> 数据统计（分析、挖掘）-> 数据可视化/报告和报警 =》改进埋点

## 常见的埋点方案
- 代码埋点
- 可视化埋点->本质就是系统用来代替手工插入埋点代码
- 无痕埋点->所有事件都被记录下来

## 监控方式
1. 当JavaScript代码错误或者引入资源错误的时候通过`window.addEventListener('error', (event)=>{})`进行监听，然后根据`event.target.src || event.target.href`是否有值判断是js错误还是资源错误，如果有值，则是资源错误
2. 当Promise发送错误，比如未catch之类需要通过`window.addEventListener('unhandledrejection',(event)=>{})`进行监听，然后进行数据收集
3. 接口错误的监控前端需要重写`XMLHttpRequest.prototype.open`和`XMLHttpRequest.prototype.send`，并监听`load, error, abort`事件从而获取请求的数据以及错误信息
4. 白屏错误的监控可以通过在可视范围内选取多个点，通过`document.elementsFromPoint(pointX, pointY)`拿到点所在的dom元素，之后根据dom属性进行判断是否白屏，如果超过规定数量的点都是白屏点，则认为页面发送白屏
```
//可以通过屏幕横竖画十字的点进行判断
for (let i = 1; i < 9; i++) {
	//elementsFromPoint() 方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素。
	let xElements = document.elementsFromPoint(
		window.innerWidth * i / 10,window.innerHeight / 2)  //x轴从左到右9个点
	let yElements = document.elementsFromPoint(
		window.innerWidth / 2, window.innerHeight * i / 10)  //y轴从上到下9个点
	isWrapper(xElements[0]) //判断最内部元素是否是白屏点
	isWrapper(yElements[0])	//判断最内部元素是否是白屏点
}
```
需要注意的是白屏监听要在页面加载完之后因此需要判断`document.readyState === 'complete'`否则需要`window.addEventListener('load', listener)`
5. 用户体验指标中需要获取浏览器渲染的各个阶段时间，需要用`performance.timing`中的各个时间属性，之后再计算出自己想要的时间，发送给服务器，需要注意的是因为这些时间是需要在加载完之后才可以获取的因此需要监听	`load`才可以
6. 还有页面元素属性 `FMP LCP`等需要`PerformanceObserve`进行创建
eg:
```
new PerformanceObserve((entryList, observe)=>{
	let perfEntries = entryList.getEntries()
	LCP = perfEntries[0]
	observe.disconnect() //不再观察了
}).observe({entryType: ['largest-contentful-paint']})
```
> 观察FMP 即页面中有意义的元素，是需要单独为dom元素设置属性`elementtiming`，才会被识别
