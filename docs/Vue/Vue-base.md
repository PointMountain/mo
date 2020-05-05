# Vue基础使用

## 指令 插值
- 插值 表达式 `{ msg }`
- 指令 动态属性 `{ flag ? true : false }`
- v-html 会有[xss(Cross Site Scripting)](https://www.jianshu.com/p/4fcb4b411a66)风险，会覆盖子组件 `v-html`

## computed 和 watch
- computed有缓存，data不变不会重新计算
- watch深度监听 `deep: true`
- watch监听引用类型。拿不到oldVal 因为引用拿的是指针，所以此时oldVal已经变成了新的val了

## class 和 style
- 使用动态属性
- 使用驼峰式写法

## 条件渲染
- `v-if v-else`的用法， 可以使用变量，也可以使用`===`表达式
- `v-if`会根据条件选择渲染或者不渲染，`v-show`其实已经渲染出来了但是会根据条件设置`display`属性
- `v-if`适合切换频率低的场景，因为设置`display`的消耗比渲染的消耗小

## 循环（列表）渲染
- 遍历对象 `v-for`也可以
- `key`很重要。但是也不能乱写（使用random或index）
- `v-for`和`v-if`不能一起使用，因为一起使用的时候由于v-for优先级高，底层渲染会在每次循环时都会调用一次if，导致非常消耗性能，解决方法是可以将循环的内容用计算属性计算出来进行循环，或者将if和for分开

## 事件
- event参数，自定义参数 如果无参数，默认有一个`event`参数，如果带参数还要传event，可以用`$event`，`event`是原生的，是被挂载到当前元素的
- 事件修饰符，按键修饰符
- 事件被绑定到哪里，原生dom事件的绑定是调用了`addEventListener` 组件事件的绑定是调用了内部的$on 
  
## 表单
- v-model
- 常见表单项 `textarea, checkbox, radio, select`
- 修饰符 `lazy, number, trim`

## vue组件使用
- `props`和`$emit`
- 组件间通讯 - 自定义事件 `vue.$on`、`vue.$emit`和`vue.$off`
- 组件生命周期
  - 挂载阶段 `beforeCreate, created, beforeMount, mounted`
  - 更新阶段 `beforeUpdate, updated`
  - 销毁阶段 `beforeDestroy, destroyed`
  <br />
	组件的调用顺序都是先父后子,渲染完成的顺序肯定是先子后父<br />
  组件的销毁操作是先父后子，销毁完成的顺序是先子后父
