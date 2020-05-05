# Vue原理

## 组件化
- 数据驱动视图（MVVM）
  - 传统组件，只是静态渲染，更新还要依赖于操作DOM 

## 响应式
- 组件data的数据一旦变化，立刻触发视图的更新
- 实现数据驱动视图的第一步
- 核心API 
  - Vue2.x Object.defineProperty
    - 深度监听，需要递归到底，一次性计算量大
    - 新增属性，删除属性监听不到（Vue.set Vue.delete）
    - 无法原生监听数组，需要特殊处理
  - Vue3.0 Proxy

## vdom和diff
- vdom是实现Vue和React的重要基石
  - dom操作非常耗费性能
  - 之前用jQuery，可以自行控制DOM操作的时机，手动调整
  - 通过js模拟DOM结构，计算出最小的变更，操作DOM
- diff算法是vdom中最核心，最关键的部分

## 模板编译

## 渲染过程

## 前端路由