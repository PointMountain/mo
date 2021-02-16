# React Refs相关
不要过度使用Refs

## 字符串形式的ref 不被推荐使用（后续可能会废除）
字符串ref存在效率问题 效率不高
```js
class MyComponent extends React.Component {
  render() {
    // 展示左侧输入框的数据
    showData = () => {
      const input1 = this.refs.input1.value
      alert(input1)
    }
    // 展示右侧输入框的数据
    showData1 = () => {
      const input2 = this.refs.input2.value
      alert(input2)
    }
    return (
      <div>
        <input ref="input1" type="text" placeholder="点击按钮提示数据"/>
        <button onClick={this.showData}>按钮</button>
        <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
      </div>
    )
  }
}
```
## 回调函数形式的ref
React ref内联函数在更新过程中会被执行两次 第一次回调中是null 第二次是所处dom
因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。
```js
class MyComponent extends React.Component {
  // 将回调定义为class绑定函数
  saveInput = (e) => {
    this.input2 = e
    console.log(this.input)
  }
  render() {
    // 展示左侧输入框的数据
    showData = () => {
      const input1 = this.input1.value
      alert(input1)
    }
    return (
      <div>     {/* 回调传参是ref所处真实dom */}
        <input ref={(e) => {this.input1 = e}} type="text" placeholder="点击按钮提示数据"/>
        <input ref={this.saveInput} type="text" placeholder="点击按钮提示数据"/>
        <button onClick={this.showData}>按钮</button>
      </div>
    )
  }
}
```
## createRef
```js
class MyComponent extends React.Component {
  /*
    React.createRef()调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器是“专人专用”的
  */
  myRef = React.createRef()
  render() {
    // 展示左侧输入框的数据
    showData = () => {
      const value = this.myRef.current.value
      alert(value)
    }
    return (
      <div>
        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>
        <button onClick={this.showData}>按钮</button>
      </div>
    )
  }
}
```
## 非受控组件
表单数据现用现取就是非受控组件
```js
class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this
    alert(`username: ${username.value} password: ${password.value}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        username: <input ref={ e => this.username = e} type="text" name="username" />
        password: <input ref={ e => this.password = e} type="text" name="password" />
        <button>登录</button>
      </form>
    )
  }
}
```
## 受控组件
表单数据实时维护到state中，使用时从state中读取
```js
class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  changeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  changePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this.state
    alert(`username: ${username} password: ${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        username: <input onChange={this.changeUsername} value={this.state.username} type="text" name="username" />
        password: <input onChange={this.changePassword} value={this.state.password} type="password" name="password" />
        <button>登录</button>
      </form>
    )
  }
}
```

## 柯里化
```js
class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  changeFormData = (key) => {
    return (e) => {
      this.setState({
        [key]: e.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this.state
    alert(`username: ${username} password: ${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        username: <input onChange={this.changeFormData('username')} value={this.state.username} type="text" name="username" />
        password: <input onChange={this.changeFormData('password')} value={this.state.password} type="password" name="password" />
        <button>登录</button>
      </form>
    )
  }
}
```