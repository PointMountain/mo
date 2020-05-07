# Vue-router

## 路由模式
- hash模式 通过`onhashchange`进行操作
- H5 history 通过[H5 HistoryAPI](https://developer.mozilla.org/zh-CN/docs/Web/API/History)进行操作
- history模式需要server端支持

## 路由配置
- 动态路由 类似`path: '/user/:id'` 动态路径参数 以冒号开头
- 懒加载 `import()`