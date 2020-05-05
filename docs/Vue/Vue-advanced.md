# Vue高级特性

## 自定义v-model
在组件外部使用`v-model`绑定一个变量，在组件内部使用
```javascript
model: {
  prop: '传入变量',
  event: '自定义方法'
}
```

## $nextTick
- Vue是异步渲染<br />
  如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能考虑。`Vue`会在本轮数据更新后，再去异步更新视图
- data改变之后，DOM不会立刻渲染
- $nextTick会在DOM渲染之后被触发，以获取最新DOM节点
- `nextTick`方法主要是使用了**宏任务**和**微任务**，定义了一个异步方法。多次调用`nextTick` 会将方法存入队列中，通过这个异步方法清空当前队列。 所以这个`nextTick`方法就是异步方法
- `nextTick`内部会先调用`Promise`，如果无法使用`Promise`会调用`MutationObserver`，如果无法使用`MutationObserver`会调用`setImmediate`，如果无法使用`setImmediate`会使用`setTimeout`

## slot
- 基本使用
- 作用域插槽
- 具名插槽

## 动态组件
- `<component :is="component-name" />`
- 需要根据数据，动态渲染的场景。即组件类型不确定

## 异步组件
- `import()`函数
- 按需加载，异步加载大组件

## keep-alive `<keep-alive></keep-alive>`
- 缓存组件
- 频繁切换，不需要重复渲染
- vue常见性能优化

## mixin
- 多个组件有相同的逻辑，抽离出来
- mixin并不是完美的解决方案，会有一些问题
  - 变量来源不明确，不利于阅读
  - 多mixin可能造成命名冲突
  - mixin和组件可能出现多对多关系，复杂度较高
- Vue3提出的composition API旨在解决这些问题