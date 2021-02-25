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
```js
import { withRouter } from 'react-router-dom'

class Demo extends React.Component {
  goBack = () => {
    this.props.history.goBack()
  }
  goForward = () => {
    this.props.history.goForward()
  }
  render() {
    return (
      <div>
        <button onClick={this.goBack}>后退</button>
        <button onClick={this.goForward}>前进</button>
      </div>
    )
  }
}
export default withRouter(Demo)
```
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
     - 路由链接（携带参数）：`<Link to={pathname: '/demo/test', state: { name: 'tom', age: 18}}>详情</Link>`
     - 注册路由（无需声明，正常注册即可）：`<Route path='/demo/test' component={Test}/>`
     - 接收参数：`const { name, age } = this.props.location.state || {}`(虽然地址栏并没有任何参数，但是页面刷新参数还可以保留，因为使用history的api，而history本身会对数据有记录)

## 编程式路由导航
借助`this.props.history`对象上的API对操作路由跳转、前进、后退
  - `this.props.history.push(path, state)` 通过push跳转在history栈上增加新的路由
  - `this.props.history.replace(path, state)`通过replace跳转，替换当前栈上的路由
  - `this.props.history.goBack()`后退
  - `this.props.history.goForward()`前进
  - `this.props.history.go(n)`跳转n步，n > 0 则为前进，n < 0 则为后退

## BrowerRouter与HashRouter的区别
1. 底层原理不一样
   - BrowerRouter使用的是H5的history API，不兼容IE9及以下版本
   - HashRouter使用的是URL的哈希值
2. path表现形式不一样
   - BrowerRouter的路径中没有#，例如：localhost:3000/demo/test
   - HashRouter的路径包含#，例如：localhost:3000/#/demo/test
3. state的传参方式刷新后现象不同
   - BrowerRouter刷新后没有任何影响，因为state保存在history对象中
   - HashRouter刷新后会导致路由state参数的丢失
4. HashRouter可以用于解决一些路径错误相关问题，因为路径实际并没有变化
