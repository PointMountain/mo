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