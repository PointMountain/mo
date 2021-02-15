# React Props相关
## react中可以通过props为组件传值
```javascript
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        {this.props.sex}
      </div>
    )
  }
}
// 可以通过在组件上放所有的值
ReactDOM.render(<MyComponent name="tom" age="18" sex="男"/>, document.querySelector('#app'))
// 如果属性过多 React也可以通过结构进行赋值
const data = { name: 'tom', age: 18, sex:'男' }
ReactDOM.render(<MyComponent {...data}/>, document.querySelector('#app'))
```

## react可以为prop进行类型,必要性以及默认值的设置
```javascript
import PropTypes from 'prop-types'
// 指定类型以及必要性propTypes
MyComponent.propTypes = {
  // name: React.PropTypes.string React15.x以前使用 16以后分离成prop-types库
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number,
  speak: PropTypes.func // 因为function是关键字 所以要用func
}
// 指定默认值defaultProps
MyComponent.defaultProps = {
  sex: '未知',
  age: 20
}
// 简写
class MyComponent extends React.Component {
  // 指定类型以及必要性propTypes
  // 在class中使用static描述符可以为原型设置属性
  static propTypes = {
  // name: React.PropTypes.string React15.x以前使用 16以后分离成prop-types库
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    speak: PropTypes.func // 因为function是关键字 所以要用func
    }
  // 指定默认值defaultProps
  static defaultProps = {
    sex: '未知',
    age: 20
  }
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        {this.props.sex}
      </div>
    )
  }
}
```
## 函数组件的props
```js
function MyComponent(props) {
  return (
    <div>
      {props.name}
      {props.age}
      {props.sex}
    </div>
  )
}
// 函数组件只能放在最外面 无法放到内部
// 指定类型以及必要性propTypes
MyComponent.propTypes = {
  // name: React.PropTypes.string React15.x以前使用 16以后分离成prop-types库
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number,
  speak: PropTypes.func // 因为function是关键字 所以要用func
}
// 指定默认值defaultProps
MyComponent.defaultProps = {
  sex: '未知',
  age: 20
}
```
