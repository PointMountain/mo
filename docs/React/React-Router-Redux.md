# react-router-dom使用
`react-router-dom`库是专为web人员专门设计的`react-router`库
```js
import { HashRouter/BrowserRouter, Route, Link, Redirect, Switch, withRouter, Prompt } from 'react-router-dom'
```
`Router`必须在最外层，将组件包裹起来
```js
<HashRouter>
 <App/>
</HashRouter>
```
`Route`表示一个个页面，里面有path属性匹配跳转路由，component属性设置路由组件，exact设置是否精准匹配
其中路由组件的props会传入route相关属性
```js
<Route path='/xxx' component={Demo} exact/>
```
`Link`表示链接，通过to属性写入跳转路径，实际在浏览器是也是a标签
```js
<Link to='/xxxx'>Demo</Link>
```
`NavLink`实现路由链接的高亮，通过设置`activeClassName`设置高亮的类名，默认值会加一个`active`的class名
```js
<NavLink activeClassName='xxx' to='/xxx'>Demo</NavLink>
```
如果同时使用多个`NavLink`，且属性过多可以进行封装
```js
<MyNavLink to='/xxx' a={1} b={2} c={3}>Demo</MyNavLink>
// React中可以通过this.props.children获取标签体内容
class MyNavLink extends React.Component {
  render() {
    return (
      <NavLink activeClassName='xxx' className='xxx' {...props}/>
    )
  }
}
```
`Switch`包裹`Route`，路由在默认情况下会从上到下匹配全部`Route`，使用`Switch`之后会进行路由单一匹配，匹配到一个之后就停止，提高路由匹配效率
```js
<Switch>
  <Route path='/xxx1' component={Demo1}/>
  <Route path='/xxx2' component={Demo2}/>
  <Route path='/xxx3' component={Demo3}/>
</Switch>
```
`Redirect`表示重定向，用来兜底，一般放到所有Route后面，当所有路由都无法匹配时，跳转到Redirect指定的路由
```js
<Switch>
  <Route path='/xxx1' component={Demo1}/>
  <Route path='/xxx2' component={Demo2}/>
  <Redirect to='/xxx2'/>
</Switch>
```
`withRouter`高阶函数，将普通组件包裹起来，内部传入router相关属性
`Prompt`包裹组件，通过设置when属性，可以阻止跳转
`Route`中还有render和children两个参数接受一个函数，其中render是路由匹配成功才会执行，children是一定会执行，render优先级高于children

## 路由组件和一般组件
1. 写法不同
     - 一般组件`<Demo/>`
     - 路由组件`<Route path='/xxx' component={Demo}/>`
2. 存放位置不同
     -  一般组件：放到components文件夹里
     -  路由组件：放到pages文件夹里
3. 接受的props不同
     -  一般组件：写组件标签时传递了什么。就能收到什么
     -  路由组件：接受三个固定的属性`history`、`location`和`match`
        1. `history`:  `go(), goBack(), goForward(), push(), replace()`
        2. `location`:  `pathname, search, state`
        3. `match`:  `params, path, url`


## 解决多级路径刷新页面样式丢失问题
1. `public/index.html`中引入样式时开头不写 `./` 写 `/`
2. `public/index.html`中引入样式时开头不写 `./` 写 `%PUBLIC_URL%/` (React脚手架设置)
3. 使用HashRouter

## 路由的严格匹配和模糊匹配
1. 默认使用的是模糊匹配 输入的路径必须包含要匹配的路径，且顺序要一致
2. 开启严格匹配`<Route path='/xxx' component={Demo} exact={true}/>`
3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 嵌套路由
  1. 注册子路由时要写上父路由的path值
  2. 路由的匹配是按照注册路由的顺序进行的

## 向路由组件传递参数
  1. params参数
     - 路由链接（携带参数）：`<Link to='/demo/test/tom/18'>详情</Link>`
     - 注册路由（声明接收）：`<Route path='/demo/test/:name/:age' component={Test}/>`
     - 接收参数：`const {name, age} = this.props.match.params`
  2. search参数
     - 路由链接（携带参数）：`<Link to='/demo/test?name=tom&age=18'>详情</Link>`
     - 注册路由（无需声明，正常注册即可）：`<Route path='/demo/test' component={Test}/>`
     - 接收参数：`const { search } = this.props.location`（获取到的search是urlencoded编码字符串，即`?name=tom&age=18`，可以借助脚手架自带的querystring库进行解析 `qs.parse(search.slice(1))`）
  3. state参数
     - 路由链接（携带参数）：`<Link to={{pathname: '/demo/test', state: { name: 'tom', age: 18}}}>详情</Link>`
     - 注册路由（无需声明，正常注册即可）：`<Route path='/demo/test' component={Test}/>`
     - 接收参数：`const { name, age } = this.props.location.state || {}`(虽然地址栏并没有任何参数，但是页面刷新参数还可以保留，因为使用history的api，而history本身会对数据有记录)
# redux使用
在react中使用redux还需要react-redux
## `react-redux`
  - 在最外层提供一个`Provider`，通过store属性将store放到context上下文中
	- 在需要用store的组件内提供一个`connect`高阶函数，通过类似
		```
			const mapStateToProps = state => state
			connect(
				mapStateToProps,
				actions
			)(ComponentName)
		```
		将store中的state和dispatch传给组件的props，且为组件绑定store.subscribe使其每次都可以重新渲染内容
## redux
redux生成一个store，外部操作通过dispatch发布一个action，在store中有reducer负责接收上次的state状态和action，根据action中的type属性，对state进行修改，同时当state发生改变时，之前store.subscribe过的组件会受到通知，触发回调方法。
- reducer 接收state，action根据action对state进行操作，返回新的state 如果有多个reducer 需要使用redux的`combineReducers`将多个reducer进行合并
- action 约定好的行为 普通action返回一个包含type属性的对象，也有异步action和promise action等
- store
  - 不使用中间件的话可以直接使用redux中的createStore`let store = createStore(reducer, initialState)` 生成store
  - 使用中间件的话就需要使用redux中的applyMiddleware`let store = applyMiddleware(thunk, promise, logger)(createStore)(reducers, initialState)`
- 中间件
中间件结构都是
```
function({dispatch, getState}){
	return next => action =>{
		//一些操作
		next(action)
	}
}
```

# router、redux一起使用
使用`connected-react-router`将redux和router相连接
首先使用`history`库中的`createBrowserHistory`方法创建一个history
## 在组件上
在`react-redux`的`Provider`组件内使用`connected-react-router`的`ConnectedRouter`并将其history属性赋值history，此时无需再使用react-router-dom中的Router组件包裹Route
```
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