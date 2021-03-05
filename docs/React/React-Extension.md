# React扩展

## setState更新状态的两种写法
### `setState(stateChange, [callback])`对象式的setState
   1. stateChange为状态改变对象（该对象可以体现出状态的更改）
   2. callback是可选的回调函数，它在render后才被调用
```js
    import React, { Component } from 'react'
    export default class App extends Component {
      state = {
        count: 0
      }
      add = () => {
        this.setState({count: this.state.count + 1}, () => {
          console.log('更新后的state',this.state.count)
        })
        console.log('上一次的state', this.state.count)
      }
      render() {
        console.log('render')
        return (
          <div>
            <span>{this.state.count}</span>
            <button onClick={this.add}>+</button>
          </div>
        )
      }
    }
```
### `setState(updater, [callback])`函数式的setState
   1. updater为返回stateChange对象的函数，内部有state，props两个参数
   2. callback是可选的回调函数，它在render后才被调用

```js
    import React, { Component } from 'react'
    export default class App extends Component {
      state = {
        count: 0
      }
      add = () => {
        this.setState((state, props) => ({count: state.count + 1}), () => {
          console.log('更新后的state',this.state.count)
        })
        console.log('上一次的state', this.state.count)
      }
      render() {
        console.log('render')
        return (
          <div>
            <span>{this.state.count}</span>
            <button onClick={this.add}>+</button>
          </div>
        )
      }
    }
```

> 对象式的setState是函数式setState的简写方式（语法糖）
> 如果新状态不依赖于原状态，可以使用对象式；如果新状态依赖于原状态，可以使用函数式；如果需要在setState执行后获取最新的状态数据，要在第二个callback函数中读取（也可以将setState包裹在宏任务中，此时setState表现为同步 **后续可以研究下**）

## lazyLoad
### 路由组件的lazyLoad
```js
import React, { lazy, Suspense } from 'react'
import Loading from './Loading'
// 通过React的lazy函数配合import()动态加载路由组件
const Demo1 = lazy(() => import('./Demo1'))
const Demo2 = lazy(() => import('./Demo2'))
// 通过React中的Suspense组件包裹路由组件，且必须指定一个fallback内容
<Suspense fallback={Loading}>
  <Switch>
    <Route path="/demo1" component={Demo1}>
    <Route path="/demo2" component={Demo2}>
  </Switch>
</Suspense>
```

## React Hook
React Hook是React 16.8.0版本增加的新特性，可以在函数组件中使用一些React特性
### State Hook
1. State Hook让函数组件可以有state状态，并进行状态数据的读写操作
2. `const [xxx, setXxx] = React.useState(initValue)`
3. useState传入初始化指定的值，且在内部做缓存，返回包含内部当前状态值和更新状态值函数两个元素的数组
4. 函数组件每次渲染时都会重新执行一次，但是useState并不会再进行初始化，而是使用已缓存的内容
```js
import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const increment = () => {
    setCount(count + 1) // 直接指定新的值
  }
  const decrement = () => {
    setCount(count => count - 1) // 使用函数接收之前的值，返回新的值
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>+</button>
    </div>
  )
}
```
### Effect Hook
1. Effect Hook可以再函数组件中执行副作用操作（用于模拟组件中的生命周期）
2. React中的副作用操作有发送ajax请求、设置订阅/启动定时器、手动更改真实DOM等操作
3. 使用方法：
    ```js
    React.useEffect(() => {
      // 在此可以执行任何带副作用的操作
      return () => { // 组件卸载前触发
        // 在此做一些收尾工作，比如清除定时器，取消订阅等
      }
    }, [stateValue]) // stateValue是可选数组参数，如果不写则监听所有状态变化执行回调函数，如果使用[]空数组，则只有首次render时执行回调，如果指定了某个状态，则会只监听指定状态变化执行回调

    import React from 'react'
    import ReactDOM from 'react-dom'
    export default function App() {
      const [count, setCount] = React.useState(0)
      React.useEffect(() => {
        let timer = setInterval(() => {
          setCount(count => count + 1)
        }, 1000)
        return () => {
          clearInterval(timer)
        }
      }, [])
      const unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
      }
      return (
        <div>
          <span>{count}</span>
          <button onClick={unmount}>卸载组件</button>
        </div>
      )
    }
    ```
4. 可以把Effect Hook看作`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`三个函数的集合
### Ref Hook
1. Ref Hook可以再函数组件中存储/查找组件内的标签或任意其它数据
2. `const refContainer = React.useRef()`
3. 用来保存标签对象，功能与`React.createRef()`一样
```js
import React from 'react'
export default function App() {
  const refContainer = React.useRef()
  const show = () => {
    alert(refContainer.current.value)
  }
  return (
    <div>
      <input ref={refContainer}/>
      <button onClick={show}>展示内容</button>
    </div>
  )
}
```

## Fragment
作用是可以不用必须有一个真实的DOM根标签
```js
import React, { Fragment } from 'react'
function Demo1() {
  return (
    <Fragment key={1}>
      <div>1</div>
      <div>2</div>
    </Fragment>
  )
} // 渲染出来之后没有最外层的标签
function Demo2() {
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  )
} // <></>效果与Fragment一样，但是如果是列表组件需要key属性的话只能用Fragment，<></>不能设置key，另外Fragment属性只能设置key和children
```

## Context
Context是一种组件通信方式，常用于祖先组件与后代组件间通信
1. 创建Context容器`const XxxContext = React.createContext()`
2. 渲染子组件时，外面包裹`XxxContext.Provider`，通过`value`属性给后代组件传递数据
```js
<XxxContext.Provider value={value}>
  <子组件 />
</XxxContext.Provider>
```
3. 后代组件读取数据
```js
// 仅用于类组件
static contextType = XxxContext // 声明接受的context
this.context // 读取context中的value数据

// 类组件和函数组件都可使用
<XxxContext.Consumer>
  {
    value => {
      // 返回所需内容
    }
  }
</XxxContext.Consumer>

import React from "react";
const DemoContext = React.createContext();
export default function App() {
  return (
    <DemoContext.Provider value={{ name: "ming", age: 18 }}>
      <Demo1 />
      <Demo2 />
    </DemoContext.Provider>
  )
}
class Demo1 extends React.Component {
  static contextType = DemoContext;
  render() {
    return (
      <>
        {this.context.name},{this.context.age}
      </>
    )
  }
}
function Demo2() {
  return (
    <DemoContext.Consumer>
      {(value) => `${value.name}, ${value.age}`}
    </DemoContext.Consumer>
  )
}
```

## 组件优化
Components中的两个问题
>1. 只要执行setState，即使不改变状态数据，组件也会重新render() ===> 效率低
>2. 只要当前组件重新render()，就会自动重新render子组件，即使子组件没有用到父组件的任何数据 ===> 效率低
原因是因为Component中的`shouldComponentUpdate`总是返回true
解决方法:
1. 重写`shouldComponentUpdate`方法，比较新旧state或props数据，如果有变化才返回true，如果没有返回false
2. 直接使用`React.PureComponent`，`PureComponent`重写了`shouldComponentUpdate`方法，只有state或props数据有变化才返回true，但是只是进行state和props数据的浅比较，如果只是数据对象内部变了，返回false；因此不能直接修改原始state，而是要用新的数据
```js
// 使用新的数据返回true
this.setState({ a: 1, ...this.state })
// 直接修改state返回false
this.state.a = 1
this.setState(this.state)
```

## render props
React中向组件内部动态传入带内容的结构
1. 使用children props：通过组件标签传入结构
```js
<A>
  <B>xxxxxx</B>
</A>
// 组件B中获取
this.props.children // 如果B组件需要A组件内的数据，做不到
```
2. 使用render props：通过组件标签属性传入结构，而且可以携带数据，使用render函数属性 类似Vue中的slot插槽
```js
<A render={(data) => <C data={data}></C>}/>
// A组件内部调用render函数
this.props.render(想要传给C组件的props)
// C组件 直接读取A组件传入的数据
this.props.data
```

## 错误边界Error boundary
错误边界是用来捕获后代错误，渲染出备用页面的操作
只能捕获**后代组件生命周期**产生的错误，不能捕获自己组建产生的错误和其他组件再合成事件、定时器中产生的错误
通过`getDerivedStateFromError`配合`componentDidCatch`
```js
class App extends React.Component {
  state = {
    hasError: ''
  }
  // 生命周期函数，一旦后台组件报错，就会触发，使用类似getDerivedStateFromProps，返回的对象会为state中对应内容赋值
  static getDerivedStateFromError(error) {
    return {
      hasError: error
    }
  }
  componentDidCatch(error, info) {
    // catch错误 可以统计页面的错误，进行埋点等操作
  }
  render() {
    return (
      <div>
        {this.state.hasError ? <h1>发生错误</h1> : <Child />}
      </div>
    )
  }
}
```

## 组件通信方式
组件间的关系
- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）
通信方式
1. props =》父子组件
   1. children props
   2. render props
2. 消息订阅-发布 =》兄弟组件、祖孙组件
   1. pubs-sub、event等
3. 集中式管理 =》组件比较复杂时 兄弟组件、祖孙组件
   1. redux
4. context =》祖孙组件 开发很少使用，一般用于封装插件
