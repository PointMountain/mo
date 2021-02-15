# React State相关
## class组件使用state
```javascript
class MyComponent extends React.Component {
  constructor() {
    // 在构造器中初始化state
    this.state = {
      name: 'tom',
      age: 18,
      sex: '男'
    }
    this.handleAge = this.handleAge.bind(this) // 在实例上创建一个handleAge方法
  }
  // 原型上的方法
  handleName() {
    this.setState((state) => ({
      name: 'jerry'
    })) // 第一种修改
  }
  // 原型上的方法
  handleAge() {
    this.setState({
      age: 20
    }) // 第二种修改
  }
  render() {
    return (
      <div>
        {this.state.name}
        {this.state.age}
        {this.state.sex}
        <div onClick={this.handleName.bind(this)}>修改姓名</div> {/* 通过bind(this)绑定事件 */}
        <div onClick={this.handleAge}>修改年龄</div>
      </div>
    )
  }
}
// 简写
class MyComponent extends React.Component {
  // 直接在实例上初始化
  state = {
    name: 'tom',
    age: 18,
    sex: '男'
  }
  // 直接在实例上挂载箭头函数this指向向上寻找到了实例上
  handleName = () => {
    this.setState((state) => ({
      name: 'jerry'
    })) // 第一种修改
  }
  handleAge = () => {
    this.setState({
      age: 20
    }) // 第二种修改
  }

  render() {
    return (
      <div>
        {this.state.name}
        {this.state.age}
        {this.state.sex}
        <div onClick={this.handleName}>修改姓名</div>
        <div onClick={this.handleAge}>修改年龄</div>
      </div>
    )
  }
}
```