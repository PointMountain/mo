# redux
redux生成一个store，外部操作通过dispatch发布一个action，在store中有reducer负责接收上次的state状态和action，根据action中的type属性，对state进行修改，同时当state发生改变时，之前store.subscribe过的组件会受到通知，触发回调方法。
```js
store.getState() // 获取state
store.dispatch(action) // 触发action进行state操作
store.subscribe(callback) // 监听state发生变化，可以调用callback，可以在回调中重新渲染组件
```
- reducer是一个纯函数，接收state，action。根据action对state进行操作，返回新的state。如果有多个reducer，需要使用redux的`combineReducers`将多个reducer进行合并
- action 约定好的行为 普通action返回一个包含type属性的对象，也有异步action和promise action等
  - 同步action返回值是一个对象
  - 异步action返回值是一个函数，异步action中一般都会调用同步action，且需要使用`redux-thunk`中间件
- store
  - 不使用中间件的话可以直接使用redux中的createStore`let store = createStore(reducer, initialState)` 生成store
  - 使用中间件的话就需要使用redux中的applyMiddleware`let store = applyMiddleware(thunk, promise, logger)(createStore)(reducers, initialState)`
- 中间件
中间件结构都是
```js
function({dispatch, getState}){
	return next => action =>{
		// 一些操作
		next(action)
	}
}
```
## `react-redux`库
  - 在react中使用redux可以使用`react-redux`简化操作
  - 在最外层提供一个`Provider`，通过store属性将store放到context上下文中
	- 在需要用store的组件内提供一个`connect`高阶函数，通过类似
		```js
			const mapStateToProps = (state) => {
				return {
					state: state
				}
			}
			const mapDispatchToProps = (dispatch) => {
				return {
					fun1: payload => dispatch(action(payload))
				}
			}
			/*
			  mapDispatchToProps还可以返回一个对象，对象内直接返回action
				const mapDispatchToProps = {
					fun1: action
				}
			*/
			connect(
				mapStateToProps,
				mapDispatchToProps
			)(ComponentName)

			// 之后在ComponentName组件中可以拿到action和state
			this.props.state
			this.props.fun1
		```
		将store中的state和dispatch传给组件的props，且为组件绑定store.subscribe使其每次都可以重新渲染内容

## 纯函数
1. 纯函数是一类特别的函数：只要是同样的输入（实参），必定得到同样的输出（返回）
2. 必须遵守一些约束
	1. 不得改写参数数据
	2. 不会产生任何副作用，例如网络请求，输入和输出设备
	3. 不能调用不纯的方法，类似Date.now()、Math.random()等

redux中的reducer函数必须是一个纯函数，因为redux内部会对reducer返回值进行浅比较，如果返回的还是同一个对象，redux会认为内容没有进行修改，不会触发页面内容更新。

## redux开发工具
1. `redux-devtools-extension`库
2. 在store文件中进行配置
```js
  import { composeWithDevTools } from 'redux-devtools-extension'

  // 无中间件
  const store = createStore(rootReducer, composeWithDevTools())
  // 有中间件
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
```

## router、redux一起使用
使用`connected-react-router`将redux和router相连接
首先使用`history`库中的`createBrowserHistory`方法创建一个history
## 在组件上
在`react-redux`的`Provider`组件内使用`connected-react-router`的`ConnectedRouter`并将其history属性赋值history，此时无需再使用react-router-dom中的Router组件包裹Route
```js
<ConnectedRouter history={history}>
	<Route path='/' exact component={Home} />
	<Route path='/counter' exact component={Counter} />
</ConnectedRouter>
```
## 在redux中
在action如果需要使用router中history的push方法直接从`connected-react-router`引入push使用即可
在reducer中需要使用`combineReducers`将`connected-react-router`中的reducer`connectRouter`放到总的reducer中
```
let reducers = combineReducers({
	router: connectRouter(history),
	...otherReducers
})
```
在生成store的时候需要使用`applyMiddleware`将`connected-react-router`中的中间件`routerMiddleware`放到总的中间件中`applyMiddleware(routerMiddleware(history))`