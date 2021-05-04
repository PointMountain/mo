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

### 初始化阶段：由ReactDOM.render()触发---初次渲染
1. `constructor()`
2. `componentWillMount()`需要加`UNSAFE_`前缀 => `getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()` ====> 常用

### 更新阶段：由组件内部this.setState()或父组件重新render触发
1. `componentWillReceiveProps()` => 需要加`UNSAFE_`前缀=>`getDerivedStateFromProps()`
2. `shouldComponentUpdate()` => 如果调用`this.forceUpdate()`强制更新则没有此步
3. `componentWillUpdate()`需要加`UNSAFE_`前缀且与`getDerivedStateFromProps()`不兼容
4. `render()`
5. `getSnapshotBeforeUpdate()`
6. `componentDidUpdate()`

### 卸载组件：由`ReactDOM.unmountComponentAtNode(HTMLElement)`触发
1. `componentWillUnmount` ====> 常用

**重点：**
`getDerivedStateFromProps`无法和三个`UNSAFE_`一起使用
## React事件处理
1. 通过onXxx属性指定事件处理函数（注意大小写）
  - React使用的是自定义合成事件，而不是使用原生DOM事件 ----为了更好的兼容性
  - React中的事件是通过事件委托方式处理的（委托给组件最外层的元素）----为了高效
2. 通过event.target得到发生事件的DOM元素对象 ----不要过度使用Refs

## React样式模块化
1. 使用less、sass等嵌套
2. 给css文件加一个module前缀
    ```js
    // index.css => index.module.css
    import index from 'index.module.css'
    function Demo() {
      return (
        <h1 className={index.title}>Hello, React</h1>
      )
    }
    ```
3. 用`styled-components`

## 功能界面组件化编码流程
1. 拆分组件：拆分界面，抽取组件
2. 实现静态组件：使用组件实现静态页面效果
3. 实现动态组件
      1. 动态显示初始化数据
          - 数据类型
          - 数据名称
          - 保存在哪个组件
      2. 交互（从绑定事件监听开始）