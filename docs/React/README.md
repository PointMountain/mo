# React基础

## 生命周期（类组件）
1. `constructor(props)`最先调用 初始化实例
2. `static getDerivedStateFromProps(props, state)`每次初始化或者更新state的时候可以调用，返回一个对象赋值给新的state，返回null则不更新，很少使用
3. `shouldComponentUpdate(nextProps, nextState)`可以根据参数选择是否进行数据更新，一般作为性能优化的考虑，返回值为true/false，但是一般类组件可以通过`PureComponent`函数组件通过`React.memo`进行浅层比较进行优化
4. `render()`返回组件
5. `componentDidMount()`会在组件挂载之后调用，如果里面直接调用 `setState()`。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在`render()`两次调用的情况下，用户也不会看到中间状态。
6. `getSnapshotBeforeUpdate(prevProps, prevState)`在组件更新之前可以拿到快照，可以将更新前的某些DOM属性返回，作为`componentDidUpdate()`的参数
7. `componentDidUpdate(prevProps, prevState, snapshot)`更新后调用
8. `componentWillUnmount()`组件卸载前调用，用于清除事件监听，timer等

- 卸载组件
```js
ReactDOM.unmountComponentAtNode(HTMLElement)
```

## React事件处理
1. 通过onXxx属性指定事件处理函数（注意大小写）
  - React使用的是自定义合成事件，而不是使用原生DOM事件 ----为了更好的兼容性
  - React中的事件是通过事件委托方式处理的（委托给组件最外层的元素）----为了高效
2. 通过event.target得到发生事件的DOM元素对象 ----不要过度使用Refs