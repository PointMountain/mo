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
    - `Proxy`,`Reflect`
    - `Reflect`和Proxy能力一一对应
    - 规范化、标准化、函数化
    - 替代Object上的工具函数
    - 深度监听，性能更好，只有在get的时候才会深度监听不像defineProperty开始就全部递归监听
    - 可监听新增/删除属性
    - 可监听数组变化

## vdom和diff
- vdom是实现Vue和React的重要基石
  - dom操作非常耗费性能
  - 之前用jQuery，可以自行控制DOM操作的时机，手动调整
  - 通过js模拟DOM结构，计算出最小的变更，操作DOM
- diff算法是vdom中最核心，最关键的部分
  - 普通树的diff的时间复杂度是O(n^3) 
  - react,vue优化时间复杂度到O(n) 即只进行同层比较

## 模板编译
- vue template complier将模板编译为render函数 `with(this){ return _c() }`
- 执行render函数生成vnode
- patch(elem, vnode) patch(vnode, newVnode)

## 渲染过程
- 初次渲染过程
  - 解析模板为render函数（或在开发环境已完成，vue-loader）
  - 触发响应式，监听data属性getter setter
  - 执行render函数，生成vnode，patch(elem, vnode)
- 更新过程
  - 修改data，触发setter（此前在getter中已被监听）
  - 重新执行render函数，生成newVnode
  - patch(vnode. newVnode) 
- 异步渲染
  - $nextTick 
  - 汇总data的修改，一次性更新视图
  - 减少DOM操作次数，提高性能 

## 前端路由(hash,history)
- hash特点
  - hash变化会触发页面跳转，即浏览器的前进，后退
  - hash变化不会刷新页面，SPA必需的特点
  - hash永远不会提交到server端
  - `window.onhashchange`
- H5 history
  - 用url规范的路由，但跳转时不刷新页面
  - 需要后端支持
  - `history.pushState`
  - `window.onpopstate`  
